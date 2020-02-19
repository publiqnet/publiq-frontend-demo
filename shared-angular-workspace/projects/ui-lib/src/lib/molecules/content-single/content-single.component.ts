import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { Avatar } from '../../../core/models/avatar';
import { ContentDataOptions } from '../../../core/models/contentData';
import { HeaderLoggedDataOptions } from '../../../core/models/headerLoggedData';
import { DropdownDataOptions } from '../../../core/models/dropdownData';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

enum ContentSingleType {
  related = 'related',
  single = 'single',
  grid = 'grid',
  edit = 'edit'
}

@Component({
  selector: 'ui-content-single',
  templateUrl: './content-single.component.html',
  styleUrls: ['./content-single.component.scss'],
})

export class ContentSingleComponent implements  OnInit, OnChanges, OnDestroy {
  @Input('type') type: ContentSingleType = ContentSingleType.related;
  @Input('contentData') contentData: ContentDataOptions = null;
  @Input('publicationList') publicationList = [];
  @Input() optionsData: DropdownDataOptions[];
  @Input() className: string = '';
  @Input() hasBoost: boolean = false;
  @Input() imageArrowsShown: boolean = false;
  @Input() canEditContent: boolean = false;
  @Input() canOnlyDelete: boolean = false;
  @Input() tagItems: HeaderLoggedDataOptions[] = null;
  @Input() loadOriginalImg: boolean = true;
  @Output() onTagItemSelect: EventEmitter<any> = new EventEmitter();
  @Output() onPublicationSelect: EventEmitter<any> = new EventEmitter();
  @Input() changeImageShown: boolean = false;
  @Output() publicationClick = new EventEmitter<any>();
  @Output() contentClick = new EventEmitter<any>();
  @Output() accountClick = new EventEmitter<any>();
  @Output() tagClick = new EventEmitter<any>();
  @Output() likeClick = new EventEmitter<any>();
  @Output() boostClick = new EventEmitter<any>();
  @Output() editClick = new EventEmitter<any>();
  @Output() historyClick = new EventEmitter<any>();
  @Output() publicationsListClick = new EventEmitter<any>();
  @Output() imageArrowClick = new EventEmitter<any>();
  @Output() changeImageClick = new EventEmitter<any>();
  @Output() imageLoaded = new EventEmitter<any>();
  public toggleHistoryIcon: boolean = false;
  public thumbnailLoaded: boolean = false;
  public originalImageLoaded: boolean = false;
  public imageUri: string;
  private unsubscribe$ = new ReplaySubject<void>(1);

  public menuOpen = {
    publication: false,
    settings: false
  };

  public dropdownSettings = [
    { text: this.translateService.instant('ui.content-single.boost_story'), value: 'boost_story' },
    { text: this.translateService.instant('ui.content-single.edit_story'), value: 'edit_story' },
  ];

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    if (this.contentData['previousVersions'] && this.contentData['previousVersions'].length) {
      this.dropdownSettings.push( { text: this.translateService.instant('ui.content-single.history_story'), value: 'history_story' });
    }

    if (this.canOnlyDelete) {
      this.dropdownSettings = [
        { text: this.translateService.instant('ui.content-single.delete_story'), value: 'delete_story' }
      ];
    }

    if (this.contentData && this.contentData.cover && this.contentData.cover.url && typeof this.contentData.cover.url === 'string') {
      const fileMatch = this.contentData.cover.url.match(/\?file=(.*?)\&/) || this.contentData.cover.url.match(/\?file=(.*?)$/);
      this.imageUri = fileMatch ? fileMatch[1] : null;
    }

    this.translateService.onLangChange
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(lang => {
        if (this.canOnlyDelete) {
          this.dropdownSettings = [
            { text: this.translateService.instant('ui.content-single.delete_story'), value: 'delete_story' }
          ];
        } else {
          this.dropdownSettings = [
            { text: this.translateService.instant('ui.content-single.boost_story'), value: 'boost_story' },
            { text: this.translateService.instant('ui.content-single.edit_story'), value: 'edit_story' },
          ];
        }
    });
  }

  selectTagValue(event) {
    this.onTagItemSelect.emit(event);
    this.closeMenu();
  }

  selectPublication(event) {
    this.onPublicationSelect.emit(event);
    this.menuOpen.settings = false;
  }

  closeMenu () {
    this.menuOpen = {
      publication: false,
      settings: false
    };
  }

  passClick(type) {
    this.menuOpen[type] = !this.menuOpen[type];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.contentData.author = new Avatar(this.contentData.author);
  }

  getTitleFirstChar() {
    return (this.contentData && this.contentData.title) ? this.contentData.title.charAt(0).toUpperCase() : '';
  }

  onPublicationClick(event) {
    event.preventDefault();
    if (this.contentData && this.contentData.status != 'pending') {
      this.publicationClick.emit(this.contentData.publication);
    }
  }

  onBoostClick(event) {
    if (this.contentData && this.contentData.status != 'pending') {
      this.boostClick.emit({
        'type': this.hasBoost ? 'cancel' : 'boost',
        'uri': this.contentData.uri,
        'boostData': this.contentData.boosts ? this.contentData.boosts : []
      });
    }
  }

  onEditClick(event) {
    if (this.contentData && this.contentData.status != 'pending') {
      this.editClick.emit(this.contentData.uri);
    }
  }

  onBtnClick(event) {
    if (this.contentData && this.contentData.status != 'pending') {
      this.toggleHistoryIcon = !this.toggleHistoryIcon;
    }
  }

  onContentClick(event) {
    event.preventDefault();
    if (this.contentData && this.contentData.status != 'pending') {
      this.contentClick.emit(this.contentData.uri);
    }
  }

  onAccountClick(event) {
    event.preventDefault();
    if (this.contentData && this.contentData.status != 'pending') {
      this.accountClick.emit(this.contentData.author);
    }
  }

  onTagClick(event, tag) {
    event.preventDefault(event);
    if (this.contentData && this.contentData.status != 'pending') {
      this.tagClick.emit(tag);
    }
  }

  onLikeClick(event, uri) {
    event.preventDefault(event);
    if (this.contentData && this.contentData.status != 'pending') {
      this.likeClick.emit(uri);
    }
  }

  onHistoryClick(event, slug) {
    event.preventDefault();
    if (this.contentData && this.contentData.status != 'pending') {
      this.historyClick.emit(slug);
    }
  }

  onPublicationsListClick(event) {
    if (this.contentData && this.contentData.status != 'pending') {
      this.publicationsListClick.emit(event.value);
    }
  }

  onChangeImageClick(event) {
    if (this.contentData && this.contentData.status != 'pending') {
      this.changeImageClick.emit(event);
    }
  }

  onImageArrowClick(diff) {
    if (this.contentData && this.contentData.status != 'pending') {
      this.imageArrowClick.emit(diff);
    }
  }

  onImageError(event, imgTye: string) {
    if (imgTye === 'thumbnail') {
      this.thumbnailLoaded = null;
    } else {
      this.originalImageLoaded = null;
    }
  }

  onImageLoaded(event: Event, imgTye: string) {
    if (imgTye === 'thumbnail') {
      this.thumbnailLoaded = true;
    } else {
      this.originalImageLoaded = true;
    }
    this.imageLoaded.emit(event);
  }

  showOriginal() {
    return this.contentData.cover.url && ((this.loadOriginalImg && (!this.contentData.cover.thumbnail || this.thumbnailLoaded || this.thumbnailLoaded === null)) ||
      (!this.loadOriginalImg && (!this.contentData.cover.thumbnail || this.thumbnailLoaded === null)));
  }

  showThumbnail() {
    return this.contentData.cover.thumbnail && (!this.loadOriginalImg
      || (this.loadOriginalImg && (!this.originalImageLoaded || this.originalImageLoaded === null || !this.contentData.cover.url)));
  }

  showSkeleton() {
    return (!this.loadOriginalImg && this.contentData.cover.thumbnail && !this.thumbnailLoaded)
      || ((this.loadOriginalImg || !this.contentData.cover.thumbnail) && this.contentData.cover.url  && !this.originalImageLoaded && !this.thumbnailLoaded);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
