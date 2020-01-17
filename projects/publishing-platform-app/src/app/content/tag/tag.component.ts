import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { of, ReplaySubject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { UtilService } from '../../core/services/util.service';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { Content } from '../../core/services/models/content';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../core/services/account.service';
import { UiNotificationService } from '../../core/services/ui-notification.service';
import { PublicationService } from '../../core/services/publication.service';
import { Publications } from '../../core/services/models/publications';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnDestroy {
  @ViewChild(NgxMasonryComponent, {static: false}) masonry: NgxMasonryComponent;
  contents: Content[] = [];
  tagName: string = '';
  listType: string = 'grid';
  startFromUri = null;
  public storiesDefaultCount = 10;
  public boostedStoriesCount = 1;

  isMasonryLoaded: boolean = false;
  myOptions: NgxMasonryOptions = {
    transitionDuration: '0s',
    itemSelector: '.story--grid',
    gutter: 10,
    horizontalOrder: true
  };

  seeMoreLoading: boolean = false;
  blockInfiniteScroll: boolean = false;
  seeMoreChecker: boolean = false;
  public boostType: string = 'boost';
  public showBoostModal: boolean = false;
  public showHighlightModal: boolean = false;
  public showHistoryModal: boolean = false;
  public selectedBoostData: any = {};
  showBoostModalType: string = 'boost';
  public contentVersions = [];
  public publicationsList = [];
  unsubscribe$ = new ReplaySubject<void>(1);

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private contentService: ContentService,
              public translateService: TranslateService,
              private publicationService: PublicationService,
              public uiNotificationService: UiNotificationService,
              private utilService: UtilService) { }

  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.seeMoreLoading = false;
        this.blockInfiniteScroll = false;
        this.seeMoreChecker = false;
        this.startFromUri = null;
      }
    });

    this.activeRoute.paramMap.pipe(
        switchMap(params => {
          this.tagName = params.get('id');
          return this.contentService.getTagArticles(this.tagName, this.startFromUri, this.storiesDefaultCount, this.boostedStoriesCount);
        }),
        takeUntil(this.unsubscribe$)
    )
    .subscribe(contentsList => {
      this.contents = contentsList.data;
      this.seeMoreChecker = contentsList.more;
      this.seeMoreLoading = false;
      this.calculateLastStoriUri();
    });

    this.accountService.accountUpdated$
      .pipe(
        filter((account: any) => account),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((account: Account) => {
        if (account && !this.publicationsList.length) {
          this.getMyPublications();
        }
      });
  }

  onLayoutComplete(event) {
    if (event && event.length > 1) {
      this.isMasonryLoaded = true;
    }
    if (this.masonry) { // todo @Sam think to move this into AftherViewInit
      this.masonry.reloadItems();
      this.masonry.layout();
    }
  }

  onTagClick(tagName) {
    this.router.navigate([`/content/t/`, tagName]);
  }

  onPublicationClick(event) {
    this.utilService.routerChangeHelper('publication', event.slug);
  }

  onContentClick(event) {
    this.utilService.routerChangeHelper('content', event);
  }

  onAccountClick(event) {
    this.utilService.routerChangeHelper('account', event.slug);
  }

  seeMore() {
    this.seeMoreLoading = true;
    this.blockInfiniteScroll = true;
    this.contentService.getTagArticles(this.tagName, this.startFromUri, this.storiesDefaultCount, this.boostedStoriesCount)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (data: any) => {
          this.seeMoreChecker = data.more;
          this.seeMoreLoading = false;
          this.contents = this.contents.concat(data.data);
          this.blockInfiniteScroll = false;
          this.calculateLastStoriUri();
        }
      );
  }

  calculateLastStoriUri() {
    const lastIndex = this.contents.length - 1;
    if (this.contents[lastIndex].uri !== this.startFromUri) {
      this.startFromUri = this.contents[lastIndex].uri;
    }
  }

  hideOverflow(elem) {
    elem ? document.querySelector('html').classList.add('overflow-hidden') : document.querySelector('html').classList.remove('overflow-hidden');
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

  onRouteChange(event: any, data: Content) {
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

  closeHighlightModal() {
    this.showHighlightModal = false;
    document.querySelector('body').classList.remove('no-scroll');
  }

  closeHistoryModal(event) {
    if (event.closeHistory) { this.showHistoryModal = false; }
    this.hideOverflow(this.showHistoryModal);
  }

  submittedBoost() {
    this.closeBoostModal();
    this.showHighlightModal = true;
  }

  closeBoostModal() {
    this.showBoostModal = false;
    this.hideOverflow(this.showBoostModal);
  }

  changePublication(event, contentUri) {
    if (!event) {
      event = null;
    }
    this.contentService.updateContentPublication(event, contentUri)
      .pipe(
        switchMap(() => event === null ? of(null) : this.publicationService.getPublicationBySlug(event)),
        takeUntil(this.unsubscribe$))
      .subscribe(publication => {
        this.contents.forEach((content: Content) => {
          if (content.uri === contentUri) {
            content.publication = publication;
          }
        });
        this.uiNotificationService.success(this.translateService.instant('author.success'), this.translateService.instant('author.publication_successfully_updated'));
      });
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
