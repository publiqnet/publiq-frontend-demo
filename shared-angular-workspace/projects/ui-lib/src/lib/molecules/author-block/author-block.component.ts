import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Avatar } from '../../../core/models/avatar';

enum AuthorSingleType {
  top = 'top',
  trending = 'trending',
}


@Component({
  selector: 'ui-author-block',
  templateUrl: './author-block.component.html',
  styleUrls: ['./author-block.component.scss'],
})

export class AuthorBlockComponent implements OnChanges {
  @Input('data') data: Avatar[] = [];
  @Input('countByPage') countByPage: number;
  @Input('hasMore') hasMore: boolean = false;
  @Input('title') title: string = null;
  @Input() className: string;
  @Input('currUserPbKey') currUserPbKey: string;
  @Input('type') type: AuthorSingleType = AuthorSingleType.top;
  @Output() loadMore = new EventEmitter<any>();
  @Output() getAuthor = new EventEmitter<any>();
  @Output() onFollow = new EventEmitter<any>();
  showData: Avatar[] = [];
  refreshAnimate: boolean = false;
  private lastIndex = 0;
  public rotateDeg: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.length > this.countByPage) {
      this.showData = this.data.slice(this.lastIndex, this.lastIndex + this.countByPage);
      this.lastIndex = this.lastIndex + this.countByPage;
    }
  }

  _getAuthor(event) {
    this.getAuthor.emit(event);
  }

  _onFollow(event) {
    this.onFollow.emit(event);
  }

  nextList() {
    this.refreshAnimate = !this.refreshAnimate;
    this.rotateDeg += 180;
    if (this.data.length > this.countByPage) {
      this.showData = this.data.slice(this.lastIndex, this.lastIndex + this.countByPage);
      this.lastIndex = this.lastIndex + this.countByPage;
    }
    if (this.lastIndex >= this.data.length) {
      this.lastIndex = 0;
    }
  }
}
