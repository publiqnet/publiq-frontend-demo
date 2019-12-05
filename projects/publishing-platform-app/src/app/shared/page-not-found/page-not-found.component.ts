import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  isDataLoaded: boolean = false;
  unsubscribe$ = new ReplaySubject(1);
  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.isDataLoaded = false;
        }
      });
    if (isPlatformBrowser(this.platformId)) {
      this.isDataLoaded = true;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
