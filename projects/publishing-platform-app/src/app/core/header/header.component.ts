import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { of, ReplaySubject, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ContentService } from '../services/content.service';
import { ErrorService } from '../services/error.service';
import { Search } from '../services/models/search';
import { DecimalPipe, isPlatformBrowser, Location } from '@angular/common';
import { Tag } from '../services/models/tag';
import { environment } from '../../../environments/environment';
import { UtilService } from '../services/util.service';
import { SharedDataService } from '../services/shared-data.service';
import { Notification } from '../../core/services/models/notification';
import { PublicationService } from '../services/publication.service';
import { TranslateService } from '@ngx-translate/core';
import { UiNotificationService } from '../services/ui-notification.service';

enum NotificationActions {
  REDIRECT = 'redirect',
  REDIRECT_USER = 'redirect-user',
  REDIRECT_PUBLICATION = 'redirect-publication',
  REDIRECT_INVITATIONS = 'redirect-invitations',
  REDIRECT_PB_REQUESTS = 'redirect-pb-requests',
  MARK_AS_READ = 'mark-as-read',
  MARK_AS_UNREAD = 'mark-as-unread',
  MARK_ALL_AS_READ = 'mark-all-as-read',
  DELETE_NOTIFICATION = 'delete-notification',
  DELETE_ALL_NOTIFICATIONS = 'delete-all-notifications'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DecimalPipe]
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() showSearch: boolean = false;
  public searchData: Search;
  public searchWord: string;
  public defaultSearchData = null;
  private unsubscribe$ = new ReplaySubject<void>(1);
  private stopNotificationTimer$: ReplaySubject<void> = new ReplaySubject<void>();
  private firstCheck: number = 0;
  public headerData: any = {
    logo: '/assets/images/publiq-media.svg',
    notificationData: {}
  };
  public isDataLoaded = false;
  public tagsList: Tag[] = [];

  private notificationCount = 10;
  private notificationLastId = 0;
  private notifications: Notification[] = [];
  private newNotificationsCount: number = 0;
  isBrowser = false;

  seeMoreChecker: boolean = true;
  blockInfiniteScroll: boolean = false;
  seeMoreLoading: boolean = false;
  private emittedNumber: number;
  private allowRequests: boolean = true;

  constructor(
    public router: Router,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private contentService: ContentService,
    private errorService: ErrorService,
    private utilService: UtilService,
    public translate: TranslateService,
    private decimalPipe: DecimalPipe,
    private notificationService: UiNotificationService,
    public sharedData: SharedDataService,
    public publicationService: PublicationService,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.accountService.accountUpdated$
        .pipe(
          switchMap(() => this.contentService.getAllTags()),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((tagsList: Tag[]) => {
          this.tagsList = tagsList;
          this.updateHeaderData();
        });

      this.accountService.accountUpdated$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((info) => {
          if (info && this.allowRequests) {
            this.allowRequests = false;
            timer(10, 10000)
              .pipe(
                switchMap((emittedNumber: any) => {
                  this.emittedNumber = emittedNumber;
                  return this.notificationService.getNotifications(this.emittedNumber === 0 ? this.notificationCount : 20, 0);
                }),
                takeUntil(this.stopNotificationTimer$))
              .subscribe((res) => {
                this.notificationLastId = this.emittedNumber === 0 ?
                  (res.notifications && res.notifications.length ? res.notifications[res.notifications.length - 1]['id'] : 0)
                  : this.notificationLastId;
                this.notifications = this.emittedNumber === 0 ? [...res.notifications.map(n => new Notification(n))]
                  : this.notifications;
                this.seeMoreChecker = this.emittedNumber === 0 ? res.more : this.seeMoreChecker;
                this.newNotificationsCount = this.emittedNumber === 0 ? res.unseenCount : this.newNotificationsCount;

                const unseenCount = res.unseenCount - this.newNotificationsCount;
                if (unseenCount > 0 && this.emittedNumber > 0) {
                  if (unseenCount <= res.notifications.length) {
                    this.notifications = [...res.notifications.slice(0, unseenCount).map(n => new Notification(n)), ...this.notifications];
                    this.newNotificationsCount = res.unseenCount;
                  } else {
                    this.notificationService.getNotifications(unseenCount, 0)
                      .pipe(take(1))
                      .subscribe((innerRes) => {
                        this.notifications = [...innerRes.notifications.map(n => new Notification(n)), ...this.notifications];
                        this.newNotificationsCount = innerRes.unseenCount;
                      });
                  }
                }
                this.updateHeaderData();
              });
            this.firstCheck += 1;
          } else {
            if (this.firstCheck) {
              this.allowRequests = false;
              this.stopNotificationTimer$.next();
              this.stopNotificationTimer$.complete();
            }
          }
        });

      this.sharedData.currentArticle.subscribe(article => {
        if (article) {
          this.headerData.articleData = {
            user: article.author,
            title: article.title,
            slug: article.uri,
            followingAuthor: article.author.subscribed,
            isCurrentUser: this.accountService.loggedIn() && (article.author.publicKey === this.accountService.accountInfo.publicKey)
          };
        } else {
          this.headerData.articleData = null;
        }
      });
      this.sharedData.currentPublication.subscribe(publication => {
        if (publication) {
          this.headerData.publicationData = {
            title: publication.title,
            logo: publication.logo,
            cover: publication.cover,
            views: publication.views,
            storiesCount: publication.storiesCount,
            subscribersCount: publication.subscribersCount,
            membersList: publication.membersCount,
            following: publication.following,
            memberStatus: publication.memberStatus,
            slug: publication.slug
          };
        } else {
          this.headerData.publicationData = null;
        }
      });
    }

    this.contentService.updateDraft$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(draftData => {
        if (draftData && draftData.updated) {
          const draftUpdated = {'updated': Date.parse(draftData.updated) / 1000};
          this.headerData = {...this.headerData, ...{'draftData': draftUpdated}};
        } else {
          const draftUpdated = {'updated': 0};
          this.headerData = {...this.headerData, ...{'draftData': draftUpdated}};
        }
      });

    this.translate.onLangChange
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(lang => {
        this.updateHeaderData();
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.isDataLoaded = true, 500);
    this.accountService.followAuthorChanged
      .pipe(
        filter((data) => data.from === 'article'),
        tap((data) => {
          this.headerData.articleData.followingAuthor = data.following;
        }),
        takeUntil(this.unsubscribe$),
      ).subscribe();
  }

  onShare(platform) {
    if (isPlatformBrowser(this.platformId)) {
      switch (platform) {
        case 'facebook':
          window.open('https://www.facebook.com/sharer/sharer.php?u=' +
            encodeURIComponent(environment.main_site_url + '/s/' +
              this.headerData.articleData.slug), 'facebooksharer',
            `width=600, height=400, top=${(screen.availHeight || screen.height) / 2 - 200},` +
            `left=${(screen.availWidth || screen.width) / 2 - 300}, scrollbars=no`);
          break;
        case 'twitter':
          window.open('http://twitter.com/share?url=' +
            encodeURIComponent(environment.main_site_url + '/s/' +
              this.headerData.articleData.slug), 'twittersharer',
            `width=600, height=300, top=${(screen.availHeight || screen.height) / 2 - 150},` +
            `left=${(screen.availWidth || screen.width) / 2 - 300}, toolbar=0, resizable=1`);
          break;
        case 'linkedin':
          window.open('http://www.linkedin.com/shareArticle?mini=true&url=' +
            encodeURIComponent(environment.main_site_url + '/s/' +
              this.headerData.articleData.slug), 'linkedinsharer',
            `width=600, height=300, top=${(screen.availHeight || screen.height) / 2 - 150},` +
            `left=${(screen.availWidth || screen.width) / 2 - 300}, toolbar=0, resizable=1`);
          break;
        case 'reddit':
          window.open('http://www.reddit.com/submit?url=' +
            encodeURIComponent(environment.main_site_url + '/s/' + this.headerData.articleData.slug) +
            '&title=' + encodeURIComponent(this.headerData.articleData.title), 'redditsharer',
            `width=600, top=${(screen.availHeight || screen.height) / 2 - 150},` +
            `left=${(screen.availWidth || screen.width) / 2 - 300}, height=300, toolbar=0, resizable=1`);
          break;
      }
    }
  }

  onPublicationFollow(event) {
    const followType = this.headerData.publicationData.following ? this.publicationService.unfollow(event.slug) : this.publicationService.follow(event.slug);
    followType.pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe
      (() => {
        this.headerData.publicationData.following = !this.headerData.publicationData.following;
        this.publicationService.updatePublication$.emit(this.headerData.publicationData);
      });
  }

  onArticleAuthorFollow(event) {
    if (!this.accountService.loggedIn()) {
      this.router.navigate([`//user/login`]);
      return false;
    }
    const followType = this.headerData.articleData.followingAuthor ? this.accountService.unfollow(event.slug) : this.accountService.follow(event.slug);
    followType.pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe
      ((data) => {
        this.headerData.articleData.followingAuthor = !this.headerData.articleData.followingAuthor;
        this.accountService.followAuthorChanged.next({from: 'header', uri: this.headerData.articleData.slug, following: this.headerData.articleData.followingAuthor});
      });
  }


  getNotifications() {
    if (this.accountService.loggedIn()) { // todo @Sam review for better solution
      this.notificationService.getNotifications(this.notificationCount, this.notificationLastId)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(res => {
          if (res.notifications && res.notifications.length) {

            this.seeMoreChecker = res.more;
            this.seeMoreLoading = false;
            this.blockInfiniteScroll = false;

            this.newNotificationsCount = res.unseenCount;
            this.notifications.push(...res.notifications.map(n => new Notification(n)));
            this.notificationLastId = res.notifications[res.notifications.length - 1]['id'];
          } else {
            this.seeMoreChecker = false;
            this.seeMoreLoading = false;
            this.blockInfiniteScroll = false;
          }
          this.updateHeaderData();
        });
    }
  }

  searchEvent(event) {
    if (event) {
      document.querySelector('html').classList.add('overflow-hidden');
      this.contentService.getDefaultSearchData()
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((data: any) => {
          this.defaultSearchData = data;
        });
    } else {
      document.querySelector('html').classList.remove('overflow-hidden');
    }

    this.showSearch = event;
    this.searchData = null;
  }

  onInputChange(searchValue: string) {
    this.searchWord = searchValue;
    if (this.showSearch && this.searchWord != '') {
      this.contentService.searchByWord(this.searchWord)
        .subscribe((data: Search) => {
          this.searchData = data;
        }, error => {
          console.log(error);
        });
    } else {
      this.searchData = null;
    }
  }

  updateHeaderData() {
    this.headerData.isLogged = this.accountService.loggedIn();
    this.headerData.userData = {
      user: {
        fullName: this.accountService.loggedIn() ? this.accountService.accountInfo.fullName : '',
        image: this.accountService.loggedIn() ? this.accountService.accountInfo.image : '',
        slug: this.accountService.loggedIn() ? this.accountService.accountInfo.publicKey : ''
      }
    };
    this.headerData.userLoggedData = [
      {
        icon: 'pbq',
        text: this.accountService.loggedIn() ? this.decimalPipe.transform(this.accountService.accountInfo.balance, '0.0-8') + ' PBQ' : '',
        inner: {
          'text': this.translate.instant('header.wallet'),
          'icon': 'arrow-right',
        },
        className: 'dropdown-list__item--pbq',
        value: 'wallet',
        seperator: true
      },
      {
        icon: 'new-story',
        text: this.translate.instant('header.new_story'),
        value: 'new-story'
      },
      {
        icon: 'profile',
        text: this.translate.instant('header.profile'),
        value: 'profile',
        seperator: true,
        className: 'silly'
      },
      {
        icon: 'publication',
        text: this.translate.instant('header.publications'),
        value: 'publications'
      },
      {
        icon: 'logout',
        text: this.translate.instant('header.log_out'),
        value: 'logout',
        seperator: true
      },
      {
        text: ' © PUBLIQ',
        className: 'inline-items language-title',
        value: '',
      },
      {
        text: 'EN',
        value: 'en',
        className: 'inline-items language-switcher ' + (this.translate.currentLang == 'en' ? 'selected' : ''),
      },
      {
        text: 'JP',
        value: 'jp',
        className: 'inline-items language-switcher ' + (this.translate.currentLang == 'jp' ? 'selected' : ''),
      }
    ];
    this.headerData.notificationData.notifications = this.notifications;
    this.headerData.notificationData.newNotificationsCount = this.newNotificationsCount;
  }

  titleClicked() {
    if (this.isBrowser) {
      if (document.documentElement.scrollTop) {
        document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
      } else if (document.body.scrollTop) {
        document.body.scrollTo({top: 0, behavior: 'smooth'});
      } else if (window.scrollTo) {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    }
  }

  userAuth(page) {
    this.router.navigate([`/user/${page}`]);
  }

  onRouteChange(event) {
    if (event.slug && event.slug.action) {
      this.onNavigationLink(event);
    } else if (event.action == 'redirect') {
      if (event.slug == '' && !this.location.isCurrentPathEqualTo(`/`)) {
        this.router.navigate([`/`]);
      } else if (event.slug == '' && this.location.isCurrentPathEqualTo(`/`)) {
        window.location.reload();
      } else if (event.slug == 'logout') {
        this.accountService.logout();
        if (!this.location.isCurrentPathEqualTo(`/`)) {
          this.router.navigate([`/`]);
        }
      } else if (['en', 'jp'].includes(event.slug)) {
        this.changeLang(event.slug);
      } else if (event.slug == 'profile') {
        this.router.navigate([`//a/${this.accountService.accountInfo.publicKey}`]);
      } else if (event.slug == 'wallet') {
        window.open(environment.wallet_url, '_blank');
      } else {
        const headerRoutesList = {
          'new-story': `content/newcontent`,
          'profile': `content/newcontent`,
          'publications': `p/my-publications`,
        };
        if (headerRoutesList[event.slug]) {
          this.router.navigate([headerRoutesList[event.slug]]);
        }
      }
    }
  }

  private onNavigationLink(e) {
    switch (e.slug.action) {
      case NotificationActions.REDIRECT:
        if (!e.slug.slug.isRead) {
          this.markAsRead(e, true);
        }
        this.router.navigate([`/a/${e.slug.slug.actionFrom.slug}`]);
        break;
      case NotificationActions.REDIRECT_USER:
        if (!e.slug.slug.isRead) {
          this.markAsRead(e, true);
        }
        this.router.navigate([`/a/${e.slug.slug.actionFrom.slug}`]);
        break;
      case NotificationActions.REDIRECT_PUBLICATION:
        if (!e.slug.slug.isRead) {
          this.markAsRead(e, true);
        }
        this.router.navigate([`/p/${e.slug.slug.publication.slug}`]);
        break;
      case NotificationActions.REDIRECT_INVITATIONS:
        if (!e.slug.slug.isRead) {
          this.markAsRead(e, true);
        }
        const openInvitations = {openInvitations: true};
        this.router.navigate([`/p/my-publications`, openInvitations]);
        break;
      case NotificationActions.REDIRECT_PB_REQUESTS:
        if (!e.slug.slug.isRead) {
          this.markAsRead(e, true);
        }
        const openRequests = {openRequests: true};
        this.router.navigate([`/p/${e.slug.slug.publication.slug}`, openRequests]);
        break;
      case NotificationActions.MARK_AS_READ:
        this.markAsRead(e, true);
        break;
      case NotificationActions.MARK_AS_UNREAD:
        this.markAsRead(e, false);
        break;
      case NotificationActions.MARK_ALL_AS_READ:
        this.notificationService.readAllNotifications()
          .pipe(
            switchMap(() => {
              return this.newNotificationsCount ? this.notificationService.resetNewNotificationsCount() : of(null);
            }),
            takeUntil(this.unsubscribe$))
          .subscribe(res => {
            this.newNotificationsCount = 0;
            this.notifications.forEach((notification: Notification) => {
              notification.isRead = true;
            });
            this.updateHeaderData();
          });
        break;
      case NotificationActions.DELETE_NOTIFICATION:
        this.notificationService.deleteNotification(e.slug.slug.slug).subscribe(() => {
          this.updateHeaderData();
        });
        this.notifications = this.notifications.filter((item: Notification) => e.slug.slug.slug !== item.slug);
        break;
      case NotificationActions.DELETE_ALL_NOTIFICATIONS:
        this.notificationService.deleteAllNotifications().subscribe(() => {
          this.updateHeaderData();
        });
        this.notifications = [];
        break;
    }
    this.resetNewNotificationsCount();
  }

  onTagSelect(event) {
    this.showSearch = true;
  }

  onNotificationMenuOpened() {
    this.resetNewNotificationsCount();
  }

  onPublishArticleClick(event) {
    this.contentService.publishArticleChanged$.next(event);
  }

  onNotificationsTabScrollEvent = function seeMoreEvent(event) {
    if (event === 'scrolledDown') {
      if (this.newNotificationsCount) {
        this.notificationService.resetNewNotificationsCount()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe();
      }
      if (this.seeMoreChecker) {
        this.seeMoreLoading = true;
        this.blockInfiniteScroll = true;
        this.getNotifications();
      }
    } else if (event === 'scrolledUp') {
      this.resetNewNotificationsCount();
    }
  };

  private resetNewNotificationsCount = () => {
    if (this.newNotificationsCount) {
      this.newNotificationsCount = 0;
      this.updateHeaderData();
      this.notificationService.resetNewNotificationsCount()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();
    }
  }

  private markAsRead = (e, readStatus) => {
    this.notificationService.toggleStatus(e.slug.slug.slug, readStatus)
      .subscribe(res => {
        this.notifications.forEach((notification: Notification) => {
          notification.slug == e.slug.slug.slug ? notification.isRead = readStatus : notification.isRead = notification.isRead;
        });
      });
  }

  onContinueArticle() {
    this.router.navigate([`/`]);
  }

  changeLang(lang) {
    if (this.translate.currentLang != lang) {
      if (this.accountService.loggedIn()) {
        this.accountService.changeLang(lang);
      } else {
        localStorage.setItem('lang', lang);
        this.translate.use(lang);
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.sharedData.currentArticle.next(null);
    this.sharedData.currentPublication.next(null);
  }
}
