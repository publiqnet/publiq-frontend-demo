import { Component, Inject, OnDestroy, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { APP_BASE_HREF, isPlatformBrowser, PlatformLocation } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { filter, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { TranslateService } from '@ngx-translate/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AccountService } from './core/services/account.service';
import { LinkService } from './core/services/link.service';
import { ContentService } from './core/services/content.service';
import { PublicationService } from './core/services/publication.service';
import { Account } from './core/services/models/account';
import { UiNotificationService } from './core/services/ui-notification.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new ReplaySubject<void>(1);
  private translationsReady: boolean = false;


  constructor(
    private router: Router,
    private adapter: DateAdapter<any>,
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics, // TODO - do not remove this row
    private accountService: AccountService,
    private platformLocation: PlatformLocation,
    private state: TransferState,
    private contentService: ContentService,
    private linkService: LinkService,
    public translateService: TranslateService,
    private publicationService: PublicationService,
    private uiNotificationService: UiNotificationService,
    @Optional() @Inject(APP_BASE_HREF) private baseHref: string,
    @Inject(PLATFORM_ID) private platformId,
    @Optional() @Inject(REQUEST) private request: any
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = this.accountService.auth();
      if (authToken && !this.accountService.accountInfo) {
        this.accountService.loginSession();
      }

      this.accountService.accountUpdated$
        .pipe(
          filter((account: any) => account),
          takeUntil(this.unsubscribe$))
        .subscribe((account: Account) => {
          if (environment.useMercure) {
            this.uiNotificationService.initNotificationListener();
          }
          if (account && account.language) {
            this.updateLanguage(account.language);
          }
        });

      this.accountService.logoutDataChanged
        .pipe(
          takeUntil(this.unsubscribe$))
        .subscribe(() => this.publicationService.reset());

      this.translateService.use((typeof window !== 'undefined' && localStorage) ? (localStorage.getItem('lang') || 'en') : 'en');
      this.translateService.getTranslation(this.translateService.currentLang)
        .pipe(
          tap((translations) => {
            this.translationsReady = !!Object.values(translations).length;
            this.contentService.translationsReady = this.translationsReady;
          }),
          takeWhile(() => !this.translationsReady),
          takeUntil(this.unsubscribe$)
        ).subscribe();

      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          takeUntil(this.unsubscribe$))
        .subscribe(event => {
          window.scrollTo(0, 0);
        });
    }
  }

  updateLanguage(lang) {
    const currentLang = this.accountService.loggedIn() ? this.accountService.accountInfo.language : null;
    if (currentLang && currentLang != lang) {
      localStorage.setItem('lang', currentLang);
      this.translateService.use(currentLang);
    } else {
      localStorage.setItem('lang', lang);
      this.translateService.use(lang);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
