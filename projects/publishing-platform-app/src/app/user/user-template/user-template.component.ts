import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { AccountService } from '../../core/services/account.service';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.scss']
})
export class UserTemplateComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new ReplaySubject<void>(1);
  public tabberData = [
    { 'value': 'login', 'text': this.translateService.instant('user-template.sign_in')},
    { 'value': 'register', 'text': this.translateService.instant('user-template.register')}
  ];
  public activeRoute: string = null;
  public swiperConfig: SwiperOptions;
  isDataLoaded: boolean = false;
  isProd: boolean = false;
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private accountService: AccountService,
    public translateService: TranslateService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.isProd = environment.production ? true : false;
    this.activeRoute = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          // const currentUrl = event.url.substring(event.url.lastIndexOf('/') + 1);
          // currentUrl !== this.activeRoute ? this.isDataLoaded = true : this.isDataLoaded = false;
        }
        if (event instanceof NavigationEnd) {
          const currentUrl = (event.urlAfterRedirects) ? event.urlAfterRedirects : event.url;
          this.activeRoute = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        }
      });

    this.swiperConfig = {
      effect: 'fade',
      autoplay: { delay: 2000, disableOnInteraction: false },
      // @ts-ignore
      fadeEffect: { crossFade: true }
    };

    this.translateService.onLangChange.subscribe(lang => {
      this.tabberData = [
        { 'value': 'login', 'text': this.translateService.instant('user-template.sign_in')},
        { 'value': 'register', 'text': this.translateService.instant('user-template.register')}
      ];
    });

    if (isPlatformBrowser(this.platformId)) {
      this.isDataLoaded = true;
    }
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
