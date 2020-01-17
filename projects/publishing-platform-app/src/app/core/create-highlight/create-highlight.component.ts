import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Content } from '../services/models/content';
import { ContentService } from '../services/content.service';
import { UiNotificationService } from '../services/ui-notification.service';

@Component({
  selector: 'app-create-highlight',
  templateUrl: 'create-highlight.component.html',
  styleUrls: ['./create-highlight.component.scss']
})

export class CreateHighlightComponent implements OnInit, OnChanges, OnDestroy {
  @Input() contentUri: any = '';
  @Output() closeHighlightedModal = new EventEmitter<any>();
  public firstTitleChange: boolean = true;
  public firstTagChange: boolean = true;
  public currentFont: string = 'Vollkorn';
  public currentTag: string = 'default';
  public selectedBackground: string = '';
  public highlightBackgrounds = [
    '#2C56D3',
    '#1DAB5F',
    '#DC4B39',
    '#E4801F',
    '#E6B311'
  ];
  public highlightData: Content = null;
  public highlightFonts = ['Fenton', 'Journey', 'Wensley', 'Vollkorn-Bold'];
  public highlightTags = ['default', 'transparent', 'red-text', 'white-border'];
  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(
    public contentService: ContentService,
    private uiNotificationService: UiNotificationService,
    public translateService: TranslateService) {
  }

  ngOnInit() {
    this.contentService.getContentByUri(this.contentUri)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Content) => {
        this.highlightData = data;
        this.selectedBackground = this.highlightData && this.highlightData.cover &&  this.highlightData.cover.url ? '' : this.highlightBackgrounds[0];
      });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  closeHighlightModal(e) {
    this.closeHighlightedModal.emit(e);
  }

  createHighlightModal($event: any) {
    this.contentService.contentHighlight(this.highlightData.uri, this.selectedBackground, this.currentFont, this.currentTag)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.closeHighlightedModal.emit('');
        setTimeout(() => this.uiNotificationService.success(this.translateService.instant('highlight.success'), this.translateService.instant('highlight.story_successfully_added')), 0);
      },
    error => {
        if (error && error.error && error.error.type) {
          this.uiNotificationService.error(this.translateService.instant('author.system_error'), '');
        }
      });
  }

  nextItem() {
    const i = this.highlightFonts.indexOf(this.currentFont);
    this.currentFont = (this.highlightFonts[i + 1]) ? this.highlightFonts[i + 1] : this.highlightFonts[0];
  }

  nextTag() {
    const i = this.highlightTags.indexOf(this.currentTag);
    this.currentTag = (this.highlightTags[i + 1]) ? this.highlightTags[i + 1] : this.highlightTags[0];
  }

  changeFonts() {
    this.firstTitleChange = false;
    this.nextItem();
  }

  changeTags() {
    this.firstTagChange = false;
    this.nextTag();
  }

  changeBackground(data: string = '') {
    if (data) {
      this.selectedBackground = data;
    } else if (this.highlightData.cover && this.highlightData.cover.url) {
      this.selectedBackground = '';
    } else {
      this.selectedBackground = this.highlightBackgrounds[0];
    }
  }

  ngOnDestroy(): void {
    this.selectedBackground = '';
    this.highlightData = null;
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
