import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilService } from '../../../core/services/util.service';
import { ContentDataOptions } from '../../../core/models/contentData';

@Component({
  selector: 'ui-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})

export class HighlightsComponent implements OnInit {
  @Input('highlightData') highlightData: ContentDataOptions = null;
  @Input() className: string = '';
  @Output() highlightClick = new EventEmitter<any>();
  public loading = true;

  constructor(public utilService: UtilService) {}

  ngOnInit() {
    if (this.highlightData && !this.highlightData.highlightBackground && this.highlightData.cover && this.highlightData.cover.url) {
      const img = new Image;
      img.onload = () => {
        this.loading = false;
      };
      img.src = this.highlightData.cover.url;
    }
  }

  highlightClickEvent($event) {
    $event.preventDefault();
    this.highlightClick.emit(this.highlightData.uri);
  }
}
