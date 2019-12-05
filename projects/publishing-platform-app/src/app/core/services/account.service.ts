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
  public favouriteAuthorsKey = 'favourite_authors';

  // public oauthUrl = `${environment.oauth_backend}/api/user`;
  public userUrl = `${environment.backend}/api/user`;

  public accountUpdated$: BehaviorSubject<any> = new BehaviorSubject(null);
  // public showSearchBar$: EventEmitter<any> = new EventEmitter();
  public settingsSavedCloseDialog: EventEmitter<any> = new EventEmitter();
  private shortName: string;
  public brainKey: string;
  public code = '';
  public publicKey = '';
  public brainKeyEncrypted: string;
  public authors = new Map();
  currentDaemonAddress = '';

  private subscribers: Subscriber[];
  subscribersChanged = new Subject<Subscriber[]>();

  followAuthor: String;
  followAuthorChanged = new Subject<any>();

  unFollowAuthor: String;
  unFollowAuthorChanged = new Subject<String>();

  confirmCode: any;
  confirmCodeChanged = new Subject<any>();

  registerData: any;
  registerDataChanged = new Subject<any>();

  resForStep2Data: any;
  resForStep2DataChanged = new Subject<any>();

  loginData: any;
  loginDataChanged = new Subject<any>();

  logoutData: any;
  logoutDataChanged = new Subject<any>();

  loginSessionData: any;
  loginSessionDataChanged = new Subject<any>();

  sendRecoverEmailData: any;
  sendRecoverEmailDataChanged = new Subject<any>();

  recoverData: any;
  recoverDataChanged = new Subject<any>();

  updateAccountData: any;
  updateAccountDataChanged = new Subject<any>();

  notifyTransferData: any;
  notifyTransferDataChanged = new Subject<any>();

  subscriptionData: Subscriber[];
  subscriptionDataChanged = new Subject<Subscriber[]>();

  balance = 0;
  balanceChanged = new ReplaySubject<number>();

  authorChannelsData: any;
  authorChannelsDataChanged = new Subject<any>();

  preferencesDataChanged = new Subject<any>();
  preferredArticleDataChanged = new Subject<any>();

  subscriptionPreferencesData: any;
  subscriptionPreferencesDataChanged = new Subject<any>();

  profileUpdating = false;
  profileUpdatingChanged = new Subject<any>();

  signedStringChanged = new Subject<any>();
  authorStatsDataChanged = new Subject<AuthorStats>();
  getAccountDataByTermChanged: Subject<Account[]> = new Subject<Account[]>();
  mySubscribersChanged: Subject<Subscriber[]> = new Subject<Subscriber[]>();
  isSubscribedByAuthorsChanged: Subject<string[]> = new Subject<string[]>();
  tempBrainKey = '';
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

  public getBalance() {
    return this.balance;
  }

  public unsetBalance() {
    this.balance = 0;
    this.balanceChanged.next(0);
  }

  auth(): String {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem('auth')
      : null;
  }

  getAccountData() {
    const authToken = localStorage.getItem('auth') ? localStorage.getItem('auth') : '';
    if (authToken) {
      const url = this.userUrl;

      return this.httpHelper.call(HttpMethodTypes.get, url)
        .pipe(
          map((userInfo: any) => {
            this.SetAccountInfo = userInfo;
            this.brainKeyEncrypted = localStorage.getItem('encrypted_brain_key');
            return userInfo;
          })
        );
    }
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

  getAuthenticateData() {
    return this.resForStep2Data ? this.resForStep2Data : '';
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
      ).subscribe(
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

  loadAuthorSubscribers(accountName: string) {
    if (isPlatformBrowser(this.platformId)) {
      const url = this.userUrl + `/author-subscribers/${accountName}`;
      this.http.get(url)
        .pipe(
          filter(data => data != null),
          map((result: any[]) => result.length ? result.map(data => new Subscriber(data['subscriber'])) : [])
        )
        .subscribe((res: Subscriber[]) => {
          this.subscribers = res;
          this.subscribersChanged.next(this.subscribers);
        },
          error => this.errorService.handleError('loadAuthorSubscribers', error, url)
        );
    }
  }

  getSubscriptions() {
    const authToken = localStorage.getItem('auth') ? localStorage.getItem('auth') : '';
    if (authToken) {
      const url = this.userUrl + `/subscriptions`;
      return this.http.get(url, { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) });
    }
  }

  getSubscribers() {
    if (!this.subscribers || !this.subscribers.length) {
      return;
    }
    return this.subscribers.slice();
  }

  getSubscription(): void {
    if (
      (isPlatformBrowser(this.platformId) &&
        localStorage.getItem('auth') != null) ||
      ''
    ) {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        this.errorService.handleError('invalid_session_id', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
      }
      const url = this.userUrl + '/subscription';
      this.http
        .get(url, { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) })
        .pipe(
          filter(data => data != null),
          map((result: any) => {
            const subscriptions = [];
            result.map(obj => {
              if (obj['user']) {
                subscriptions.push(new Subscriber(obj['user']));
              }
              // if (obj['publication']) {
              //     obj['publication'] = new Publication(obj['publication']);
              // }
            });
            return subscriptions;
          })
        )
        .subscribe((res: any) => {
          this.subscriptionData = res;
          this.subscriptionDataChanged.next(this.subscriptionData);
        },
          error => this.errorService.handleError('getSubscription', error, url)
        );
    }
  }

  getSubscriptionAndPreferences(): void {
    if ((isPlatformBrowser(this.platformId) && localStorage.getItem('auth') != null) || '') {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        this.errorService.handleError('invalid_session_id', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
      }
      const url = this.userUrl + '/subscription-preferences';
      this.http
        .get(url, { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) })
        .pipe(map(result => {
          // @ts-ignore
          return new Preference(result);
        }))
        .subscribe(
          (res: Preference) => {
            this.resetFavouriteAuthorsAndTags(res);
            this.subscriptionPreferencesData = res;
            this.subscriptionPreferencesDataChanged.next(this.subscriptionPreferencesData);
          },
          error => this.errorService.handleError('getSubscriptionAndPreferences', error, url)
        );
    }
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
    localStorage.setItem('lang', this.translateService.currentLang ? this.translateService.currentLang : 'en');
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
    this.setShortName();
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

  public uploadPhoto(file: File): Observable<any> {
    const authToken = localStorage.getItem('auth');
    if (!authToken) {
      this.errorService.handleError('loginSession', {
        status: 409,
        error: { message: 'invalid_session_id' }
      });
      return;
    }
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post(this.userUrl + '/image', formData, {
      headers: new HttpHeaders({ 'X-API-TOKEN': authToken })
    });
  }

  public setShortName() {
    if (
      this.accountInfo &&
      this.accountInfo.firstName &&
      this.accountInfo.lastName
    ) {
      this.shortName = this.accountInfo.shortName = (
        this.accountInfo.firstName.charAt(0) +
        this.accountInfo.lastName.charAt(0)
      ).toUpperCase();
    }
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

  public notifyInTransfer(publicKey): void {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        this.errorService.handleError('loginSession', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
      }

      const url = this.userUrl + '/notify-transfer';
      this.http
        .post(
          url,
          { account: publicKey },
          { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) }
        )
        .subscribe(
          result => {
            this.notifyTransferData = result;
            this.notifyTransferDataChanged.next(this.notifyTransferData);
          },
          error => this.errorService.handleError('notifyInTransfer', error, url)
        );
    }
  }

  resetAuthorData(idOrName: string) {
    if (this.authors.has(idOrName)) {
      this.authors.delete(idOrName);
    }
  }

  public loadChannels() {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        this.errorService.handleError('loginSession', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
      }

      const url = this.userUrl + `/channels`;
      this.http
        .get(url, { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) })
        .subscribe(
          data => {
            this.authorChannelsData = data;
            this.authorChannelsDataChanged.next(this.authorChannelsData);
          },
          error => this.errorService.handleError('getChannelsError', error, url)
        );
    }
  }

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

  public getPreferences(): void {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        this.errorService.handleError('loginSession', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
        return;
      }
      const url = this.userUrl + '/preferences';
      this.http
        .get(url, { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) })
        .pipe(map(result => {
          if (result) {
            // @ts-ignore
            return new Preference(result);
          }
        }))
        .subscribe((data: Preference) => {
          this.preferencesDataChanged.next(data);
        },
          error => this.errorService.handleError('getPreferences', error, url));
    }
  }

  public updatePreferredArticle(articleId): void {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        this.errorService.handleError('loginSession', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
        return;
      }
      const url = this.userUrl + `/preferred-article/${articleId}`;
      this.http
        .post(url, '', { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) })
        .subscribe((data) => {
          this.preferredArticleDataChanged.next(data);
        },
          error => this.errorService.handleError('updatePreferredArticle', error, url));
    }
  }

  public resetFavouriteAuthorsAndTags(data) {
    if (data) {
      interface Map {
        [K: string]: number;
      }

      const updatedFavouriteTags: Map = {};
      const updatedFavouriteAuthors: Map = {};

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data[key].forEach((item) => {
            if (item && item.hasOwnProperty('tag') && item['tag']) {
              updatedFavouriteTags[item['tag']] = item['count'] || 1;
            } else if (item && item.hasOwnProperty('author')) {
              updatedFavouriteAuthors[item['author']['username']] = item['count'] || 1;
            }
          });
          let storageKey;
          let favoritObject: Map = {};
          if (key === 'tags') {
            storageKey = this.userFavouriteTagsKey;
            favoritObject = updatedFavouriteTags;
          } else if (key === 'authors') {
            storageKey = this.favouriteAuthorsKey;
            favoritObject = updatedFavouriteAuthors;
          }

          if (Object.keys(favoritObject).length) {
            localStorage.setItem(storageKey, JSON.stringify(favoritObject));
          }
        }
      }
    }
  }

  checkPassword(password: string): boolean {
    return this.cryptService.checkPassword(this.brainKeyEncrypted, password);
  }

  searchAccountByTerm: (term: string) => Observable<Author[]> = (term: string) => {
    return this.httpHelper.call(HttpMethodTypes.get, this.userUrl + `/search/${term}`)
      .pipe(map((accounts: Author[]) => accounts.map(account => new Author(account))));
  }
}
