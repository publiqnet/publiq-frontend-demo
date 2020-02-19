import {
  AfterViewInit,
  Component,
  HostListener,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef, DoCheck, OnDestroy
} from '@angular/core';
import { HeaderDataOptions } from '../../../core/models/headerData';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { fromEvent, ReplaySubject } from 'rxjs';
import { ListItemOptions } from '../../../core/models/listItem';
import { Avatar } from '../../../core/models/avatar';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnChanges, AfterViewInit, DoCheck, OnDestroy {
  @Input() headerData: HeaderDataOptions;
  @Input() showSearchBar: boolean = false;
  @Input() articleReadPercent: number = 0;
  @Input() isSecondActive: boolean = false;
  @Input() articlePage: boolean = false;
  @Output() navigationLink = new EventEmitter<any>();
  @Output() searchEvent = new EventEmitter<any>();
  @Output() publicationFollow = new EventEmitter<any>();
  @Output() articleAuthorFollow = new EventEmitter<any>();
  @Output() articleLiked = new EventEmitter<any>();
  @Output() articleShared = new EventEmitter<string>();
  @Output() publishArticleClick = new EventEmitter<string>();
  @Output() articleTitleClick = new EventEmitter<any>();
  @Output() publicationTitleClick = new EventEmitter<any>();
  @Output() notificationMenuOpened = new EventEmitter<any>();
  @Output() userFollow = new EventEmitter<any>();
  @Output() onInputChange = new EventEmitter<any>();
  @Output() userSignIn = new EventEmitter<any>();
  @Output() userSignUp = new EventEmitter<any>();
  @Output() continueArticle = new EventEmitter<any>();
  @Input() tagItems: ListItemOptions[] = null;
  @Output() onTagItemSelect: EventEmitter<any> = new EventEmitter();
  @Input() isOpen: boolean = false;
  @Input() customTagMenu: boolean = false;
  @Input() blockInfiniteScroll: boolean = false;
  @Input() seeMoreLoading: boolean = false;
  @Output() isOpenChange: EventEmitter<any> = new EventEmitter();
  @Output() seeMore: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe$ = new ReplaySubject<void>(1);
  @ViewChild('overlayMenuList', {static: false}) overlayMenuList: ElementRef;
  @ViewChild('notificationMenuList', {static: false}) notificationMenuList: ElementRef;
  @ViewChild('profileMenuList', {static: false}) profileMenuList: ElementRef;
  @ViewChild('socialMenuList', {static: false}) socialMenuList: ElementRef;

  @ViewChild('searchBar', {static: false}) searchBar: ElementRef;
  public avatarData: Avatar = null;
  public tagCountToSlice = 0;
  public showLoading: boolean = false;
  public draftUpdate: number = 0;

  public leftVal = {
    menu: 0,
    notification: 0,
    profile: 0,
    social: 0
  };

  public menuOpen = {
    menu: false,
    notification: false,
    profile: false,
    tag: false,
    social: false
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.buildAvatarData();
    setTimeout(() => {
      this.calculateLeftValues();
    }, 75);
    if (this.headerData.draftData && this.headerData.draftData.updated) {
      const currentDraftDate = this.headerData.draftData.updated;
      if (this.draftUpdate != currentDraftDate) {
        this.enableLoading(currentDraftDate);
      }
    } else {
      this.draftUpdate = 0;
    }
  }

  ngDoCheck(): void {
    this.buildAvatarData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.calculateLeftValues();
    }, 75);

    fromEvent(this.searchBar.nativeElement, 'input').pipe(
      debounceTime(600),
    ).pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
      (event: KeyboardEvent) => {
        this.onInputChange.emit(event['srcElement']['value']);
      }
    );
  }

  selectTagValue(value) {
    this.onTagItemSelect.emit(value);
    this.menuOpen.tag = false;
    this.showSearchBar = true;
    this.searchBar.nativeElement.value = value;
    this.onInputChange.emit(value);
  }

  buildAvatarData() {
    this.avatarData = new Avatar({
      first_name: this.headerData.publicationData ? this.headerData.publicationData.title : null,
      image: this.headerData.publicationData ? (this.headerData.publicationData.logo ? this.headerData.publicationData.logo : this.headerData.publicationData.cover) : null
    });
  }


  imageLoaded() {
    this.calculateLeftValues();
  }

  enableLoading(currentDraftDate: number) {
    this.showLoading = true;
    setTimeout(() => {
      this.draftUpdate = currentDraftDate;
      this.showLoading = false;
    }, 1000);
  }

  calculateLeftValues() {
    if (window.innerWidth >= 1024) {
      this.tagCountToSlice = 4;
    } else if (window.innerWidth >= 768) {
      this.tagCountToSlice = 3;
    } else {
      this.tagCountToSlice = 0;
    }

    if (this.overlayMenuList) {
      this.leftVal.menu = this.overlayMenuList.nativeElement.getBoundingClientRect().left + 4;
    }
    if (this.notificationMenuList) {
      this.leftVal.notification = this.notificationMenuList.nativeElement.getBoundingClientRect().left + 4;
    }
    if (this.profileMenuList) {
      this.leftVal.profile = this.profileMenuList.nativeElement.getBoundingClientRect().left + 4;
    }
    if (this.socialMenuList) {
      this.leftVal.social = this.socialMenuList.nativeElement.getBoundingClientRect().left + 4;
    }
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', [])
  _leftValsListener() {
    this.calculateLeftValues();
  }

  @HostListener('window:scroll', [])
  _closeMenus() {
    this.menuOpen = {
      menu: false,
      notification: false,
      profile: false,
      tag: false,
      social: false
    };
  }

  passClick(type, $event) {
    this.menuOpen[type] = !this.menuOpen[type];

    if (type === 'notification' && this.menuOpen[type]) {
      this.notificationMenuOpened.emit($event);
    }

    this.cdr.detectChanges();
  }

  closeMenu () {
    this.menuOpen = {
      menu: false,
      notification: false,
      profile: false,
      tag: false,
      social: false
    };
  }

  tagMenuOutsideClick(event) {
    if (!event.target.classList.contains('icon-menu')) {
      this.menuOpen.tag = false;
    }
  }

  navigationLinkClick(slug, action = 'redirect') {
    this.navigationLink.emit({'action': action, 'slug': slug});
  }

  _searchEvent(event, flag: boolean = null) {
    this.searchEvent.emit(flag);
    this.showSearchBar = flag;
    if (flag == true) {
      this.searchBar.nativeElement.focus();
    }
    this.searchBar.nativeElement.value = '';
  }

  _publicationFollow(follow) {
    this.publicationFollow.emit({slug: this.headerData.publicationData.slug, follow: follow});
  }

  _articleAuthorFollow(user, follow) {
    this.articleAuthorFollow.emit({author: user, slug: user.publicKey, follow: follow});
  }

  _articleLiked(event) {
    this.articleLiked.emit(event);
  }

  _continueArticle(event) {
    event.preventDefault();
    this.continueArticle.emit(event);
  }

  _articleShared(event) {
    this.articleShared.emit(event);
  }

  _publishArticle(event) {
    this.publishArticleClick.emit(event);
  }

  _userFollow(event) {
    this.userFollow.emit(event);
  }

  _userSignIn(event) {
    this.userSignIn.emit(event);
  }

  _userSignUp(event) {
    this.userSignUp.emit(event);
  }

  onLogoClick(event: MouseEvent, slug) {
      event.preventDefault();
      this.navigationLinkClick(slug);
  }

  onSeeMoreEvent(event) {
    this.seeMore.emit(event);
  }

  onSocialClick(event, type) {
    console.log(event);
    console.log(type);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
