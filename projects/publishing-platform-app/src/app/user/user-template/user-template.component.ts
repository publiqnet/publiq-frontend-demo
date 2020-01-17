import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { AccountService } from '../../core/services/account.service';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.scss']
})
export class UserTemplateComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new ReplaySubject<void>(1);
  public tabberData: any;
  public activeRoute: string = null;
  public swiperConfig: SwiperOptions;
  isDataLoaded: boolean = false;
  public translationsReady: boolean = false;
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private accountService: AccountService,
    public translateService: TranslateService,
    public contentService: ContentService,
  ) { }

  ngOnInit(): void {
    this.activeRoute = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          const currentUrl = (event.urlAfterRedirects) ? event.urlAfterRedirects : event.url;
          this.activeRoute = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        }
      });

    this.swiperConfig = {
      effect: 'fade',
      autoplay: { delay: 2000, disableOnInteraction: false },
      fadeEffect: { crossFade: true }
    };

    this.translateService.onLangChange
      .pipe(
        tap(() => {
          this.tabberData = [
            { 'value': 'login', 'text': this.translateService.instant('user-template.sign_in')},
            { 'value': 'register', 'text': this.translateService.instant('user-template.register')}
          ];
        }),
        takeUntil(this.unsubscribe$))
      .subscribe();
    this.translateService.get(['user-template.sign_in', 'user-template.register'])
      .pipe(
        tap((translations) => {
          this.tabberData = [
            { 'value': 'login', 'text': translations['user-template.sign_in']},
            { 'value': 'register', 'text': translations['user-template.register']}
          ];
        }),
        takeUntil(this.unsubscribe$))
      .subscribe();
}

  changeTab(event) {
    if (event != this.activeRoute) {
       this.router.navigate([`/user/${event}`]);
    }
  }

  changeRoute(event, route) {
    event.preventDefault();
    this.router.navigate([`/${route}`]);
  }

  useLang(lang) {
    if (this.translateService.currentLang != lang && !this.accountService.loggedIn()) {
      localStorage.setItem('lang', lang);
      this.translateService.use(lang);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
