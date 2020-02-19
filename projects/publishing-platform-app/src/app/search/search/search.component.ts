import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  OnDestroy, OnInit
} from '@angular/core';
import { Search } from '../../core/services/models/search';
import { UtilService } from '../../core/services/util.service';
import { Router } from '@angular/router';
import { delay, takeUntil, take } from 'rxjs/operators';
import { of, ReplaySubject } from 'rxjs';
import { PublicationService } from '../../core/services/publication.service';
import { AccountService } from '../../core/services/account.service';
import { ContentService } from '../../core/services/content.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnChanges, OnDestroy, OnInit {
  @Output() closeSearchBar = new EventEmitter<boolean>();
  @Input() searchResult: Search = null;
  @Input() defaultSearchData: any = null;
  @Input('searchWord') searchWord: string = null;
  public activeTab = 'all';
  public searchCount = 0;
  public searchAction = true;
  private firstTime: boolean = true;
  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(private accountService: AccountService, private utilService: UtilService,
              private publicationService: PublicationService, private router: Router,
              public contentService: ContentService, public translateService: TranslateService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchResult) {
      this.firstTime = false;
      this.searchAction = true;
      this.activeTab = 'all';
      this.searchCount = this.searchResult.totalCount;
      this.checkSearchAction();
    }
  }

  changeTab(event) {
    this.activeTab = event;
    const searchResultList = { 'stories': 'articleCount', 'publications': 'publicationCount', 'people': 'authorsCount' };
    this.searchCount = (this.activeTab == 'all') ? this.searchResult.totalCount : this.searchResult[searchResultList[this.activeTab]];
  }

  onUserClick(e) {
    this.utilService.routerChangeHelper('account', e.slug);
    this.closeSearchBar.emit(false);
  }

  changeRoute(url) {
    this.router.navigateByUrl(`/${url}`);
    this.closeSearchBar.emit(false);
  }

  onContentClick(event) {
    this.utilService.routerChangeHelper('content', event);
    this.closeSearchBar.emit(false);
  }

  onPublicationClick(event) {
    this.utilService.routerChangeHelper('publication', event.slug);
    this.closeSearchBar.emit(false);
  }

  onAccountClick(event) {
    this.utilService.routerChangeHelper('account', event.slug);
    this.closeSearchBar.emit(false);
  }

  onTagClick(tagName) {
    this.closeSearchBar.emit(false);
    this.router.navigate([`/content/t/`, tagName]);
  }

  followPublication(event, item) {
    const followType = item.subscribed ? this.publicationService.unfollow(event.slug) : this.publicationService.follow(event.slug);
    followType.pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(
        () => {}
      );
  }

  followUser(event, item) {
    const followType = item.subscribed ? this.accountService.unfollow(item.publicKey) : this.accountService.follow(item.publicKey);
    followType
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((author: Account) => {
        item.subscribed = !item.subscribed;
      });
  }

  private checkSearchAction() {
    this.searchAction = true;
    of('checking')
      .pipe(delay(400), take(1))
      .subscribe(() => { this.searchAction = false; });
  }

  showMore(searchType: string) {
    this.closeSearchBar.emit(false);
    this.router.navigate([`/search/result/`, searchType], {queryParams : {searchWord: this.searchWord}});
  }

  get checkForExistence() {
    return !this.firstTime && ((this.searchResult && !this.searchResult.totalCount && !this.searchAction) ||
      (this.defaultSearchData && this.defaultSearchData.publication && this.defaultSearchData.authors &&
        !this.defaultSearchData.publication.length && this.defaultSearchData.authors.length && !this.searchResult));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
