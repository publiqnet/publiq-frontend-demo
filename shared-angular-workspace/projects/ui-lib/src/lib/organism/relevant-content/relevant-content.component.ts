import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-relevant-content',
  templateUrl: './relevant-content.component.html',
  styleUrls: ['./relevant-content.component.scss']
})

export class RelevantContentComponent {
  @Input('type') type: string = 'one-grid';
  @Input('title') title: string = null;
  @Input('contentList') contentList: any[] = null;
  @Output() publicationClick = new EventEmitter<any>();
  @Output() contentClick = new EventEmitter<any>();
  @Output() accountClick = new EventEmitter<any>();
  @Output() tagClick = new EventEmitter<any>();
  @Output() likeClick = new EventEmitter<any>();

  @Input('titleClassName') titleClassName: string = null;
  @Input('itemsClassName') itemsClassName: string = null;

  @Output() titleClick = new EventEmitter<any>();

  public currentIndex = 0;

  changeIndex(difference) {
    if (this.currentIndex + difference >= 0 && this.currentIndex + difference < this.contentList.length) {
      this.currentIndex += difference;
    }
  }

  onPublicationClick(event) {
    this.publicationClick.emit(event);
  }

  onContentClick(event) {
    this.contentClick.emit(event);
  }

  onAccountClick(event) {
    this.accountClick.emit(event);
  }

  onTagClick(event) {
    this.tagClick.emit(event);
  }

  onTitleClick() {
    this.titleClick.emit(this.title);
  }

  onLikeClick(event) {
    this.likeClick.emit(event);
  }
}
