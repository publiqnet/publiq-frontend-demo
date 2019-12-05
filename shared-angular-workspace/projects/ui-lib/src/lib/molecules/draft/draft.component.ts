import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DraftDataOptions } from '../../../core/models/draftData';
import { UtilService } from '../../../core/services/util.service';

enum DraftTypes {
  single = 'single',

}

@Component({
  selector: 'ui-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss'],
})

export class DraftComponent implements OnInit {
  @Input('type') type: DraftTypes = DraftTypes.single;
  @Input('draftData') draftData: DraftDataOptions = null;
  @Input() className: string = '';
  @Output() contentClick = new EventEmitter<any>();
  @Output() deleteClick = new EventEmitter<any>();
  @Output() editClick = new EventEmitter<any>();
  public randomColor: string;

  constructor(public utilService: UtilService) {}

  onDeleteClick(event) {
    this.deleteClick.emit(event);
  }
  onEditClick(event) {
    this.editClick.emit(event);
  }
  _contentClick(slug) {
    this.contentClick.emit(slug);
  }
  ngOnInit(): void {
    this.defaultColors();
  }

  defaultColors () {
    const colors = ['#E9EFFF', '#E8FAF2', '#FFEDEB', '#FFF3E7', '#FFF9E3', '#E9FBFF'];
    this.randomColor = colors[Math.floor(Math.random() * colors.length)];
  }

  getDraftMainLetter() {
    const mainString = (this.draftData.title) ? this.draftData.title : this.draftData.description;
    return (mainString) ? mainString.trim().charAt(0).toUpperCase() : '';
  }
}
