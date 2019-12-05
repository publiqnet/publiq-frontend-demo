import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { BoostContentDataOptions } from '../../../core/models/boostContentData';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ui-boost-content-single',
  templateUrl: './boost-content-single.component.html',
  styleUrls: ['./boost-content-single.component.scss'],
})

export class BoostContentSingleComponent implements OnInit {
  @Input('boostContentData') boostContentData: BoostContentDataOptions = null;
  @Input() className: string = '';
  @Output() boostClick = new EventEmitter<any>();
  @Output() contentClick = new EventEmitter<any>();
  public activeList = [];
  public passiveList = [];
  public openDropdown: boolean = false;

  constructor (public translate: TranslateService) {}

  ngOnInit() {
    this.boostContentData.boosts.map(data => {
      if (['active', 'pending'].includes(data.status)) {
        this.activeList.push(data);
      } else {
        this.passiveList.push(data);
      }
    });
  }

  getTitleFirstChar() {
    return (this.boostContentData && this.boostContentData.title) ? this.boostContentData.title.charAt(0).toUpperCase() : '';
  }

  onBoostClick(event, type, hash?) {
    if (this.boostContentData) {
      this.boostClick.emit({
        'type': type,
        'uri': this.boostContentData.uri,
        'boostData': this.boostContentData.boostsList ? this.boostContentData.boostsList : [],
        hash: hash
      });
    }
  }

  onContentClick(event) {
    event.preventDefault();
    if (this.boostContentData) {
      this.contentClick.emit(this.boostContentData.uri);
    }
  }

  toggleActive() {
    this.openDropdown = !this.openDropdown;
  }
}
