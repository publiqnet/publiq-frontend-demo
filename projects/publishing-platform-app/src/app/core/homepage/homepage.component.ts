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
import { takeUntil, switchMap, map } from 'rxjs/operators';
import { ReplaySubject, of } from 'rxjs';
import { UtilService } from '../services/util.service';
import { PublicationService } from '../services/publication.service';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Content } from '../services/models/content';
import { Author } from '../services/models/author';
import { DOCUMENT, isPlatformBrowser, isPlatformServer, Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { Publication } from '../services/models/publication';
import { UtilsService } from 'shared-lib';
import { UiNotificationService } from '../services/ui-notification.service';
import { Publications } from '../services/models/publications';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  public contentArray = [];
  public trendingAuthorsList: Author[] = [];
  public recommendedPublicationsList: Publication[] = [];
  public highlightsList: Content[] = [];
  public highlightsListLoaded: boolean = false;
  public selectedHighlight: Content = null;
  public articleToBoost: Content = null;
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
  public hasMoreRecommendedPublications = false;
  public publicationsFromSlug = null;
  public recommendedPublicationsDefaultCount = 2;
  public hasMoreAuthors = false;
  public trendingAuthorsDefaultCount = 4;
  public hasFirstArticle: boolean = false;
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
  public showBoostModal: boolean = false;
  public showHighlightModal: boolean = false;
  public showHistoryModal: boolean = false;
  public publicationsList = [];
  public contentVersions = [];
  showBoostModalType: string = 'boost';
  public boostType: string = 'boost';
  public selectedBoostData: any = {};
  public feeWhole: number = 0;
  public feeFraction: number = 0;
  public currentBoostFee: number = 0;
  public currentTime: number;
  private isLoggedIn: any = undefined;
  public loadingHighlightCount: Array<number> = new Array<number>(10);
  private loadingBlockCount: Array<number> = new Array<number>(6);

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
    private uiNotificationService: UiNotificationService,
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
            return this.contentService.getHomePageData();
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(homepageData => {
          if (this.isLoggedIn !== this.accountService.loggedIn()) {
            if (this.accountService.loggedIn()) {
              this.recommendedPublicationsList = homepageData.recommended.publications;
              this.hasFirstArticle = homepageData.firstArticle;
              this.firstRelevantBlock = homepageData.preferences.author;
              this.secondRelevantBlock = homepageData.preferences.tag;
              this.articleToBoost = homepageData.articleToBoost;
              this.feeWhole = homepageData.currentBoostFee.whole;
              this.feeFraction = homepageData.currentBoostFee.fraction;
              this.currentTime = homepageData.currentBoostFee.currentTime;
              this.currentBoostFee = UtilsService.calculateBalance(homepageData.currentBoostFee.whole, homepageData.currentBoostFee.fraction);
            } else {
              this.firstRelevantBlock = UtilService.pickRandomFromArray(this.contentArray, this.storiesDefaultCount);
              this.secondRelevantBlock = UtilService.pickRandomFromArray(this.contentArray, this.storiesDefaultCount);
            }
            this.trendingAuthorsList = homepageData.trending.authors;
            this.isLoggedIn = this.accountService.loggedIn();
            this.highlightsList = homepageData.highlights;
            this.highlightsListLoaded = true;
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
    if (!this.publicationsList.length) {
      this.getMyPublications();
    }
  }

  ngAfterViewInit(): void {
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
        .subscribe(() => {});
    }
  }

  followAuthor(event) {
    if (!this.accountService.loggedIn()) {
      this.router.navigate([`/user/login`]);
    }
    const follow = event.follow ? this.accountService.follow(event.slug) : this.accountService.unfollow(event.slug);
    follow
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  onLayoutComplete(event) {
    if (event && event.length > 1) {
      this.isMasonryLoaded = true;
    }
  }

  goPublicationPage(e) {
    this.utilService.routerChangeHelper('publication', e);
  }

  goToAuthor(event) {
    this.utilService.routerChangeHelper('account', event);
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

  storageAuth() {
    return (typeof window !== 'undefined' && localStorage) && localStorage.getItem('auth') != null && localStorage.getItem('encrypted_brain_key') != null;
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
        this.uiNotificationService.error((error.status == 500) ? this.translateService.instant('homepage.empty_email') : this.translateService.instant('homepage.system_error'), '');
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

  boostStory(contentData: Content) {
    this.selectedBoostData['uri'] = contentData.uri;
    this.selectedBoostData['type'] = 'boost';
    this.selectedBoostData['transactionHash'] = '';
    this.showBoostModal = true;
    document.querySelector('body').classList.add('no-scroll');
  }

  closeBoostModal() {
    this.showBoostModal = false;
    document.querySelector('body').classList.remove('no-scroll');
  }

  closeHighlightModal() {
    this.showHighlightModal = false;
    document.querySelector('body').classList.remove('no-scroll');
  }

  hideOverflow(elem) {
    elem ? document.querySelector('html').classList.add('overflow-hidden') : document.querySelector('html').classList.remove('overflow-hidden');
  }

  closeHistoryModal(event) {
    if (event.closeHistory) { this.showHistoryModal = false; }
    this.hideOverflow(this.showHistoryModal);
  }

  submittedBoost() {
    this.refreshArticleToBoost();
    this.closeBoostModal();
    this.showHighlightModal = true;
  }


  refreshArticleToBoost() {
    this.contentService.getHomePageData()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(data => {
        this.articleToBoost = data.articleToBoost;
      });
  }

  onHighlightClicked(highlight) {
    this.selectedHighlight = highlight;
  }

  highlightFinished(highlight) {
    if (highlight === null) {
      return this.selectedHighlight = null;
    }

    this.selectedHighlight = this.highlightsList[this.highlightsList.indexOf(highlight) + 1] || this.highlightsList[0];
  }

  getMyPublications() {
    this.publicationsList = [];
    this.publicationService.getMyPublications()
      .pipe(
        map((publicationsData: Publications) => {
          const publicationsList = [...publicationsData.membership, ...publicationsData.owned];
          return publicationsList;
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(publicationsList => {
        if (publicationsList.length) {
          publicationsList.forEach(publication => {
            const text = publication.title ? publication.title : publication.description;
            const nextPublication = {
              'value': publication.slug,
              'text': text,
              'metaData': {
                'image': publication.logo ? publication.logo : publication.cover,
                'first_name': text,
                'last_name': '',
                'fullName': text
              }
            };
            this.publicationsList.push(nextPublication);
          });
        }
      });
  }

  changePublication(event, contentUri, blockType) {
    if (!event) {
      event = null;
    }
    this.contentService.updateContentPublication(event, contentUri)
      .pipe(
        switchMap(() => event === null ? of(null) : this.publicationService.getPublicationBySlug(event)),
        takeUntil(this.unsubscribe$))
      .subscribe(publication => {
        if (blockType === 'firstBlock') {
          this.firstContentBlock.forEach((content: Content) => {
            if (content.uri === contentUri) {
              content.publication = publication;
            }
          });
        } else if (blockType === 'secondBlock') {
          this.secondContentBlock.forEach((content: Content) => {
            if (content.uri === contentUri) {
              content.publication = publication;
            }
          });
        } else if (blockType === 'loadedBlock') {
          this.loadedContentBlock.forEach((content: Content) => {
            if (content.uri === contentUri) {
              content.publication = publication;
            }
          });
        }
        this.uiNotificationService.success(this.translateService.instant('author.success'), this.translateService.instant('author.publication_successfully_updated'));
      });
  }

  onBoostModal(data) {
    this.selectedBoostData = {};
    if (data && data.type == 'cancel' && data['boostData'] && data['boostData'].length) {
      data['boostData'].forEach(boost => {
        if (['pending', 'active'].includes(boost.status)) {
          this.selectedBoostData['transactionHash'] = boost['transaction']['transactionHash'];
        }
      });
    }
    this.selectedBoostData['uri'] = data.uri;
    this.selectedBoostData['type'] = data.type;
    this.showBoostModal = true;
    this.hideOverflow(this.showBoostModal);
    this.hideOverflow(this.showHighlightModal);
    this.showBoostModalType = data.type == 'cancel' ? 'cancel-boost' : 'boost';
  }

  onRouteChange(event: any, data: any) {
    const BoostInfo = {
      data: data.boosts,
      type: this.boostType,
      uri: data.uri
    };
    if (event == 'edit_story') {
      this.router.navigate([`/content/edit/${data.uri}`]);
    } else if (event == 'boost_story') {
      this.onBoostModal(BoostInfo);
    } else if (event == 'history_story') {
      this.contentVersions = data.previousVersions;
      this.showHistoryModal = true;
    }
  }

  ngOnDestroy() {
    this.publicationsFromSlug = null;
    this.recommendedPublicationsList = [];
    this.trendingAuthorsList = [];
    this.highlightsList = [];
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
