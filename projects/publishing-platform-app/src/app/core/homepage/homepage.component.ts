import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { OauthService } from 'helper-lib';
import { ContentService } from '../services/content.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ReplaySubject, of } from 'rxjs';
import { UtilService } from '../services/util.service';
import { PublicationService } from '../services/publication.service';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Content } from '../services/models/content';
import { DOCUMENT, isPlatformBrowser, isPlatformServer, Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  public contentArray = [];
  public preferedAuthorContent: Content[] = [];
  public preferedTagContent: Content[] = [];
  public isMasonryLoaded = false;
  public listType = 'grid';
  public seeMoreChecker = false;
  public seeMoreLoading = false;
  public blockInfiniteScroll = false;
  public isDataLoaded = false;
  public following: boolean = true;
  public welcomeMessageState = 'default';
  public startEarningShown = true;
  public startFromUri = null;
  public currentRequestedUri = null;
  public storiesDefaultCount = 20;
  public storiesPerBlock = 9;
  public firstRelevantBlock = [];
  public secondRelevantBlock = [];
  public firstContentBlock = [];
  public secondContentBlock = [];
  public loadedContentBlock = [];
  public publicationsList = [];
  public hasMorePublications = false;
  public publicationsFromSlug = null;
  public publicationsDefaultCount = 4;
  public haveFirstArticle: boolean = false;
  public isProd: boolean = false;
  public myOptions: NgxMasonryOptions = {
    transitionDuration: '0s',
    itemSelector: '.story--grid',
    gutter: 10,
    horizontalOrder: true
  };
  welcomeMessageType: string = null;
  updateMasonryFirstBlock: boolean = false;
  updateMasonrySecondBlock: boolean = false;
  updateMasonryContentBlock: boolean = false;

  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(
    private contentService: ContentService,
    private publicationService: PublicationService,
    public utilService: UtilService,
    public accountService: AccountService,
    private router: Router,
    private oauthService: OauthService,
    public translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId,
    @Inject(DOCUMENT) private document: any,
  ) {
  }

  ngOnInit() {
    this.isProd = environment.production ? true : false;
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.welcomeMessageType = null;
        this.isDataLoaded = false;
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.welcomeMessageType = 'welcome_to_media';
      this.isDataLoaded = true;
      this.accountService.accountUpdated$
        .pipe(
          switchMap((account: any) => {
            if (account && !this.publicationsList.length) {
              return this.contentService.getRecommendations(this.publicationsFromSlug, this.publicationsDefaultCount);
            } else {
              return of(null);
            }
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(contentData => {
          if (contentData) {
            this.preferedAuthorContent = contentData.author;
            this.preferedTagContent = contentData.tag;
            this.haveFirstArticle = contentData.firstArticle;
            this.firstRelevantBlock = this.preferedAuthorContent.slice(0, this.storiesDefaultCount);
            this.secondRelevantBlock = this.preferedTagContent.slice(0, this.storiesDefaultCount);
            this.loadMorePublications(true, contentData);
          } else if (!this.accountService.loggedIn()) {
            this.firstRelevantBlock = UtilService.pickRandomFromArray(this.contentArray, this.storiesDefaultCount);
            this.secondRelevantBlock = UtilService.pickRandomFromArray(this.contentArray, this.storiesDefaultCount);
          }
        });

      this.contentService.getHomePageContents(this.startFromUri, this.storiesDefaultCount)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((contentData: any) => {
          this.contentArray = contentData.data;
          this.seeMoreChecker = contentData.more;
          this.seeMoreLoading = false;
          if (this.contentArray.length) {
            this.firstContentBlock = this.contentArray.slice(0, this.storiesPerBlock);
            this.secondContentBlock = this.contentArray.slice(this.storiesPerBlock, this.storiesDefaultCount);
            this.loadedContentBlock = this.contentArray.slice(this.storiesDefaultCount);
            this.calculateLastStoriUri();
            if (!this.accountService.loggedIn()) {
              this.firstRelevantBlock = UtilService.pickRandomFromArray(this.contentArray, this.storiesDefaultCount);
              this.secondRelevantBlock = UtilService.pickRandomFromArray(this.contentArray, this.storiesDefaultCount);
            }
          }
        });
    }
  }

  ngAfterViewInit(): void {
  }

  loadMorePublications(init = false, publicationsListData = null) {
    if (init && publicationsListData) {
      this.initRecommendedPublications(publicationsListData);
    } else {
      this.contentService.getRecommendations(this.publicationsFromSlug, this.publicationsDefaultCount)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(
          (publicationsListData: any) => {
            this.initRecommendedPublications(publicationsListData);
          }
        );
    }
  }

  refreshPublications() {
    this.publicationsFromSlug = null;
    this.contentService.getRecommendations(this.publicationsFromSlug, this.publicationsDefaultCount)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (publicationsListData: any) => {
          this.initRecommendedPublications(publicationsListData, true);
        }
      );
  }

  initRecommendedPublications(publicationsListData, refresh: boolean = false) {
    this.hasMorePublications = publicationsListData.more;
    this.publicationsList = (refresh) ? publicationsListData.publications : this.publicationsList.concat(publicationsListData.publications);
    const lastIndex = this.publicationsList.length - 1;
    if (this.publicationsList[lastIndex] && this.publicationsList[lastIndex].slug && this.publicationsList[lastIndex].slug !== this.publicationsFromSlug) {
      this.publicationsFromSlug = this.publicationsList[lastIndex].slug;
    }
  }

  calculateLastStoriUri() {
    const lastIndex = this.contentArray.length - 1;
    if (this.contentArray[lastIndex].uri !== this.startFromUri) {
      this.startFromUri = this.contentArray[lastIndex].uri;
    }
  }

  followPublication(event) {
    if (!this.accountService.loggedIn()) {
      this.router.navigate([`/user/login`]);
    }
    if (event.follow) {
      this.publicationService.follow(event.slug)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
            const pubIndex = this.publicationsList.findIndex(x => x.slug == event.slug);
            this.publicationsList.splice(pubIndex, 1);
            if (this.hasMorePublications) {
              this.refreshPublications();
            }
          }
        );
    }
  }

  onLayoutComplete(event) {
    if (event && event.length > 1) {
      this.isMasonryLoaded = true;
    }
  }

  goPublicationPage(e) {
    this.utilService.routerChangeHelper('publication', e);
  }

  seeMore() {
    if (this.currentRequestedUri != this.startFromUri) {
      this.currentRequestedUri = this.startFromUri;
      this.seeMoreLoading = true;
      this.blockInfiniteScroll = true;
      this.contentService.getHomePageContents(this.startFromUri, this.storiesDefaultCount)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
      (data: any) => {
        this.seeMoreChecker = data.more;
        this.seeMoreLoading = false;
        this.contentArray.push(...data.data);
        this.loadedContentBlock.push(...data.data);
        this.calculateLastStoriUri();
        this.blockInfiniteScroll = false;
      });
    }
  }

  onSignUp(email) {
    this.oauthService.authenticate(email, true)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(oauthData => {
        if (oauthData.status == 204) {
          this.welcomeMessageState = 'sent';
        } else if (oauthData.status == 200) {
          this.welcomeMessageState = 'sent';
        }
      }, error => {
        this.welcomeMessageState = 'invalid';
      });
  }

  goToEditor(fromPopup = false) {
    if (fromPopup) {
      this.accountService.startEarningPopupShown = false;
    }

    this.router.navigate([`/content/newcontent`]);
  }

  onTagClick(tagName) {
    this.router.navigate([`/content/t/`, tagName]);
  }

  useLang(lang) {
    if (this.translateService.currentLang != lang) {
      if (this.accountService.loggedIn()) {
        this.accountService.changeLang(lang);
      } else {
        localStorage.setItem('lang', lang);
        this.translateService.use(lang);
      }
    }
  }

  ngOnDestroy() {
    this.publicationsFromSlug = null;
    this.publicationsList = [];
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
