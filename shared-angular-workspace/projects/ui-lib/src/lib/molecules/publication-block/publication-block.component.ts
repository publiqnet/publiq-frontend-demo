import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PublicationDataOptions } from '../../../core/models/publicationData';

@Component({
  selector: 'ui-publication-list',
  templateUrl: './publication-block.component.html',
  styleUrls: ['./publication-block.component.scss'],
})

export class PublicationBlockComponent implements OnChanges {
  @Input('data') data: PublicationDataOptions[] = [];
  @Input('countByPage') countByPage: number;
  @Input('hasMore') hasMore: boolean = false;
  @Input() className: string;
  @Output() loadMore = new EventEmitter<any>();
  @Output() getPublication = new EventEmitter<any>();
  @Output() onFollow = new EventEmitter<any>();
  showData: PublicationDataOptions[] = [];
  refreshAnimate: boolean = false;
  private lastIndex = 0;
  public rotateDeg: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.previousValue !== changes.data.currentValue) {
      if (this.data.length > this.countByPage) {
        this.showData = this.data.slice(this.lastIndex, this.lastIndex + this.countByPage);
        this.lastIndex = this.lastIndex + this.countByPage;
      }
    }
  }

  _getPublication(event) {
    this.getPublication.emit(event);
  }

  _onFollow(event) {
    this.onFollow.emit(event);
  }

  updateActions() {
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
