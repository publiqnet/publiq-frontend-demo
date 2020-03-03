import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';


import { AccountService } from './account.service';
import { ErrorEvent, ErrorService } from './error.service';

@Injectable()
export class AuthguardService implements CanActivate, CanActivateChild {
  loginSessionSubscription: Subscription = Subscription.EMPTY;
  errorHandleSubscription: Subscription = Subscription.EMPTY;
  lang: string = 'es';
  constructor(
    private router: Router,
    private accountService: AccountService,
    private errorService: ErrorService,
    public translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (isPlatformBrowser(this.platformId)) {
      return new Promise(resolve => {
        this.lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'es';
        if (this.accountService.loggedIn()) {
          resolve(true);
          return;
        }
        // get language from url
        const authToken = localStorage.getItem('auth')
          ? localStorage.getItem('auth')
          : null;
        if (!authToken) {
          if (state && state.url && state.url === `/user/login` || ( state && state.url && state.url === `/user/register`)
            || ( state && state.url && state.url === `/user/recover`)) {// todo review needed
            resolve(true);
            return;
          }
          resolve(false);
          this.router.navigate([`/user/login`]);
          return;
        } else {
          this.accountService.loginSession();
          this.loginSessionSubscription = this.accountService.loginSessionDataChanged.subscribe(
            () => {
              if (state && state.url && state.url === `/user/login` || ( state && state.url && state.url === `/user/register`)
              || ( state && state.url && state.url === `/user/recover`) ) {
                  this.router.navigate(['/']); // navigate to home page when also signed in
                  resolve(false);
                  return;
              }
              return resolve(true);
            }
          );

          this.errorHandleSubscription = this.errorService.errorEventEmiter.subscribe(
            (error: ErrorEvent) => {
              if (error.action === 'loginSession') {
                // Todo: fix localStorage issue (logout, guards)
                localStorage.setItem('auth', '');
                localStorage.setItem('encrypted_brain_key', '');
                localStorage.setItem('lang', this.lang);
                this.router.navigate([`/user/login`]);
                resolve(false);
                return;
              }
            }
          );
        }
      });
    } else {
      return true;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
