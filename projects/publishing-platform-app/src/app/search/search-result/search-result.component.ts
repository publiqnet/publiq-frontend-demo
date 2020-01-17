import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService, SearchData } from '../../core/services/content.service';
import { UtilService } from '../../core/services/util.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { PublicationService } from '../../core/services/publication.service';
import { AccountService } from '../../core/services/account.service';
import { TranslateService } from '@ngx-translate/core';
import { Content } from '../../core/services/models/content';
import { Publications } from '../../core/services/models/publications';
import { UiNotificationService } from '../../core/services/ui-notification.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  @ViewChild(NgxMasonryComponent, {static: false}) masonry: NgxMasonryComponent;
  listType: string = 'grid';
  isMasonryLoaded: boolean = false;
  searchType: string;
  searchWord: string;
  searchResult: SearchData;
  myOptions: NgxMasonryOptions = {
    transitionDuration: '0s',
    itemSelector: '.story--grid',
    gutter: 10,
    horizontalOrder: true
  };
  searchResultTypes = {
    Authors: 'authors',
    Publications: 'publication',
    Articles: 'article'
  };
  seeMoreLoading: boolean = false;
  seeMoreChecker: boolean = false;
  blockInfiniteScroll: boolean = false;
  takeFrom: string = null;
  defaultCount: number = 10;
  public boostType: string = 'boost';
  public showBoostModal: boolean = false;
  public showHighlightModal: boolean = false;
  public showHistoryModal: boolean = false;
  public selectedBoostData: any = {};
  showBoostModalType: string = 'boost';
  public contentVersions = [];
  public publicationsList = [];

  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(private activeRoute: ActivatedRoute, private router: Router,
              public uiNotificationService: UiNotificationService,
              public contentService: ContentService, private utilService: UtilService,
              private publicationService: PublicationService, private accountService: AccountService,
              public translateService: TranslateService,

  ) {
  }

  ngOnInit() {
    this.activeRoute.paramMap.pipe(
      switchMap(params => {
        return this.activeRoute.queryParamMap.pipe(
          map(queryParam => {
            this.searchType = params.get('id');
            this.searchWord = queryParam.get('searchWord');
            return {param: params.get('id'), queryParam: queryParam.get('searchWord')};
          })
        );
      }),
      switchMap(data => {
        switch (data.param) {
          case this.searchResultTypes.Articles :
            return this.contentService.searchArticlesByWord(data.queryParam, this.defaultCount);
          case this.searchResultTypes.Authors :
            return this.contentService.searchAuthorsByWord(data.queryParam, this.defaultCount);
          case this.searchResultTypes.Publications :
            return this.contentService.searchPublicationsByWord(data.queryParam, this.defaultCount);
        }
      }),
      takeUntil(this.unsubscribe$)
    )
      .subscribe(data => {
        this.seeMoreChecker = data.more;
        this.searchResult = data;
        this.calculateLastIndex();
      });
    if (!this.publicationsList.length) {
      this.getMyPublications();
    }
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

  followPublication(event, item) {
    const followType = item.subscribed ? this.publicationService.unfollow(event.slug) : this.publicationService.follow(event.slug);
    followType.pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(
        () => {
        }
      );
  }

  followUser(event, item) {
    const followType = item.subscribed ? this.accountService.unfollow(item.publicKey) : this.accountService.follow(item.publicKey);
    followType
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((author: Account) => {
        item.subscribed = !item.subscribed;
      });
  }

  onUserClick(e) {
    this.utilService.routerChangeHelper('account', e.slug);
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

  changeRoute(url) {
    this.router.navigateByUrl(url);
  }

  seeMore() {
    this.seeMoreLoading = true;
    this.blockInfiniteScroll = true;
    this.search()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (data) => {
          this.seeMoreChecker = data.more;
          this.seeMoreLoading = false;
          this.searchResult[this.searchType] = this.searchResult[this.searchType].concat(data[this.searchType]);
          this.searchResult.more = data.more;
          this.calculateLastIndex();
          this.blockInfiniteScroll = false;
        }
      );
  }

  calculateLastIndex() {
    const lastIndex = this.searchResult[this.searchType].length - 1;
    switch (this.searchType) {
      case this.searchResultTypes.Publications :
        if (this.searchResult.publication[lastIndex].slug !== this.takeFrom) {
          this.takeFrom = this.searchResult.publication[lastIndex].slug;
        }
        break;
      case this.searchResultTypes.Authors :
        if (this.searchResult.authors[lastIndex].publicKey !== this.takeFrom) {
          this.takeFrom = this.searchResult.authors[lastIndex].publicKey;
        }
        break;
      case this.searchResultTypes.Articles :
        if (this.searchResult.article[lastIndex].uri !== this.takeFrom) {
          this.takeFrom = this.searchResult.article[lastIndex].uri;
        }
        break;
    }
  }
  private search(): Observable<SearchData> {
    switch (this.searchType) {
      case this.searchResultTypes.Articles :
        return this.contentService.searchArticlesByWord(this.searchWord, this.defaultCount, this.takeFrom);
      case this.searchResultTypes.Authors :
        return this.contentService.searchAuthorsByWord(this.searchWord,  this.defaultCount, this.takeFrom);
      case this.searchResultTypes.Publications :
        return this.contentService.searchPublicationsByWord(this.searchWord,  this.defaultCount, this.takeFrom);
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
        this.searchResult.article.forEach((content: Content) => {
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
