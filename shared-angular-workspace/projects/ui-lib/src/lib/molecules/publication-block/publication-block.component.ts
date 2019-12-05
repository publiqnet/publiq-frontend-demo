import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
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
  goRight: boolean = false;
  refreshAnimate: boolean = false;
  counterFrom: number = 0;
  counterTo: number = 0;
  public rotateDeg: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.counterTo = this.data.length;
    if (this.data.length > this.countByPage) {
      const lastCount = this.data.length % this.countByPage;
      this.counterFrom = lastCount ? (this.data.length - lastCount) : (this.data.length - this.countByPage);
      this.showData = this.data.slice(this.counterFrom, this.counterTo);
    } else {
      this.counterFrom = 0;
      this.showData = this.data;
    }

    this.goRight = this.hasMore;
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
    if (this.counterTo >= this.data.length && this.hasMore) {
      this.loadMore.emit(true);
    } else {
      this.counterFrom = (this.counterFrom + this.countByPage >= this.data.length) ? 0 : this.counterTo;
      this.counterTo = this.counterFrom + this.countByPage;
      this.showData = this.data.slice(this.counterFrom, this.counterTo);
    }

    this.goRight = (this.counterTo >= this.data.length) ? this.hasMore : true;
  }

}
