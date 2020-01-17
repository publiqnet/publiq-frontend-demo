import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContentService } from '../services/content.service';
import { AccountService } from '../services/account.service';
import { BrowserNotificationService } from '../services/browser-notification.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, AfterViewInit, OnDestroy {
  account: any = true;
  navIsFixed: boolean;
  isBrowser = false;
  private actionClass: string;
  hideFooter = false;

  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private contentService: ContentService,
    private accountService: AccountService,
    private browserNotificationService: BrowserNotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
      this.hideFooter = false;
      this.accountService.accountUpdated$
        .subscribe(result => {
          this.account = Boolean(result);
        });

      this.contentService.hideFooter$
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(visibility => this.hideFooter = visibility);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      if (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop > 100
      ) {
        this.navIsFixed = true;
      } else if (
        (this.navIsFixed && window.pageYOffset) ||
        document.documentElement.scrollTop ||
        document.body.scrollTop < 10
      ) {
        this.navIsFixed = false;
      }
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.browserNotificationService.requestPermission();
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      (function smoothScroll() {
        const currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothScroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }
}
