import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { CryptService } from './crypt.service';
import { Account } from './models/account';
import { ErrorService } from './error.service';
import { Preference } from './models/preference';
import { AuthorStats, AuthorStatsOptions } from './models/authorStats';
import { Subscriber } from './models/subscriber';
import { UtilsService } from 'shared-lib';
import { HttpHelperService, HttpMethodTypes } from 'helper-lib';
import { Author } from './models/author';
import { UtilService } from './util.service';
import { Router } from '@angular/router';
@Injectable()
export class AccountService {
  public api;
  private accountInfoData: Account = null;
  public userFavouriteTagsKey = 'user_favourite_tags';
  public userUrl = `${environment.backend}/api/user`;
  public accountUpdated$: BehaviorSubject<any> = new BehaviorSubject(null);
  public brainKey: string;
  public code = '';
  public publicKey = '';
  public brainKeyEncrypted: string;
  public authors = new Map();
  followAuthorChanged = new Subject<any>();
  logoutDataChanged = new Subject<any>();
  loginSessionData: any;
  loginSessionDataChanged = new Subject<any>();
  recoverDataChanged = new Subject<any>();
  balance = 0;
  public stringToSign: number;
  public startEarningPopupShown: boolean = false;
  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object,
              private httpHelper: HttpHelperService,
              private errorService: ErrorService,
              private utilsService: UtilsService,
              private cryptService: CryptService,
              private router: Router,
              public translateService: TranslateService) {}
  static isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  auth(): String {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem('auth')
      : null;
  }
  accountAuthenticate(token: string): Observable<any> {
    const url = this.userUrl + `/authenticate`;
    return this.http.get(url, { headers: new HttpHeaders({ 'X-OAUTH-TOKEN': token }) })
      .pipe(
        map((userInfo: any) => {
          localStorage.setItem('auth', userInfo.token);
          localStorage.setItem('encrypted_brain_key', this.brainKeyEncrypted);
          this.SetAccountInfo = userInfo;
          return userInfo;
        }))
      ;
  }
  getAuthorByPublicKey(publicKey: string) {
    const url = this.userUrl + `/author-data/${publicKey}`;
    return this.httpHelper.call(HttpMethodTypes.get, url)
      .pipe(
        filter(account => account != 'undefined' || account != null),
        map((account: any) => new Account(account))
      );
  }
  private set SetAccountInfo(userInfo) {
    if (userInfo != null) {
      const data = (this.accountInfoData) ? this.accountInfoData : {};
      const accountCurrentInfo = {
        ...data,
        ...userInfo,
        token: (userInfo.hasOwnProperty('token')) ? userInfo.token : localStorage.getItem('auth')
      };
      this.accountInfoData = new Account(accountCurrentInfo);
    } else {
      this.accountInfoData = null;
    }
    if (this.accountInfo && this.accountInfo['language']) {
      localStorage.setItem('lang', this.accountInfo['language']);
      this.translateService.use(this.accountInfo['language']);
    }
    this.accountUpdated$.next(this.accountInfo);
  }
  public get accountInfo(): Account {
    return this.accountInfoData;
  }
  loginSession(): void {
    // if accountData is present, do not login again
    if (this.accountInfo) {
      return;
    }
    const authToken = localStorage.getItem('auth');
    if (!authToken) {
      this.errorService.handleError('loginSession', {
        status: 409,
        error: { message: 'invalid_session_id' }
      });
    }
    const url = this.userUrl;
    this.httpHelper.call(HttpMethodTypes.get, url)
      .pipe(
        map((userInfo: any) => {
          this.SetAccountInfo = userInfo;
          this.brainKeyEncrypted = localStorage.getItem('encrypted_brain_key');
          return userInfo;
        })
      )
      .subscribe(
        data => {
          this.loginSessionData = data;
          this.loginSessionDataChanged.next(this.loginSessionData);
        },
        error => {
          localStorage.removeItem('auth');
          this.errorService.handleError('loginSession', error, url);
        }
      );
  }
  logout() {
    const token = this.accountInfo.token;
    this.SetAccountInfo = null;
    // Todo: fix localStorage issue (logout, guards)
    localStorage.setItem('auth', '');
    localStorage.removeItem('auth');
    localStorage.setItem('encrypted_brain_key', '');
    localStorage.removeItem('encrypted_brain_key');
    this.brainKey = '';
    localStorage.removeItem('for_adult');
    localStorage.setItem('lang', this.translateService.currentLang ? this.translateService.currentLang : 'es');
    localStorage.removeItem(this.userFavouriteTagsKey);
    this.accountUpdated$.next(null);
    this.logoutDataChanged.next(null);
    this.http
      .post(this.userUrl + '/signout', '', {
        headers: new HttpHeaders({ 'X-API-TOKEN': token })
      })
      .subscribe(
        () => {
        },
        error => this.errorService.handleError('logout', error)
      );
  }
  loggedIn() {
    return this.accountInfo != null;
  }
  getAccount() {
    return this.accountInfo;
  }
  public updateAccount(updateData): Observable<any> {
    const url = this.userUrl;
    return this.httpHelper.call(HttpMethodTypes.post, url, updateData)
      .pipe(
        map((userInfo: any) => {
          this.SetAccountInfo = userInfo;
          return userInfo;
        })
      );
  }
  follow = (slug: string): Observable<any> => {
    if (this.loggedIn()) {
      return this.httpHelper.call(HttpMethodTypes.post, this.userUrl + `/${slug}/subscribe`);
    } else {
      UtilService.setRedirectUrl(this.router.url);
      this.router.navigate([`/user/login`]);
      return of([]);
    }
  }
  unfollow = (slug: string): Observable<any> => this.httpHelper.call(HttpMethodTypes.delete, this.userUrl + `/${slug}/subscribe`);
  public changeLang(lang: string): void {
    localStorage.setItem('lang', lang);
    if (this.accountInfo && this.accountInfo['language'] != lang) {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        this.errorService.handleError('loginSession', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
        return;
      }
      const url = this.userUrl + `/set-language/${lang}`;
      this.httpHelper.call(HttpMethodTypes.post, url)
        .subscribe(
          () => {
            this.accountInfo['language'] = lang;
            this.accountUpdated$.next(this.accountInfo);
          },
          error => this.errorService.handleError('changeLang', error, url)
        );
    }
  }
  searchAccountByTerm: (term: string) => Observable<Author[]> = (term: string) => {
    return this.httpHelper.call(HttpMethodTypes.get, this.userUrl + `/search/${term}`)
      .pipe(map((accounts: Author[]) => accounts.map(account => new Author(account))));
  }

  getAuthorSubscribers(publicKey: string, count: number, lastId: number): Observable<any> {
    return this.httpHelper.call(HttpMethodTypes.get, this.userUrl + `/${publicKey}/subscribers/${count}/${lastId}`)
      .pipe(map((data: any) => {
        data.subscribers = data.subscribers.map(subscriber => new Author(subscriber));
        return data;
      }));
  }
}
