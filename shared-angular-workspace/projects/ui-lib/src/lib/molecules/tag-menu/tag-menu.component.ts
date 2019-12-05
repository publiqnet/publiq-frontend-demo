import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TagMenuItemOptions } from '../../../core/models/tagMenu';
import { SelectedDataOptions } from '../../../core/models/tagMenuSelectedData';

@Component({
  selector: 'ui-tag-menu',
  templateUrl: './tag-menu.component.html',
  styleUrls: ['./tag-menu.component.scss'],
})

export class TagMenuComponent {
  @Input() tagItems: TagMenuItemOptions[] = null;
  @Output() onTagItemSelect: EventEmitter<SelectedDataOptions> = new EventEmitter<SelectedDataOptions>();
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<any> = new EventEmitter();
  @Output() onClickedOutside: EventEmitter<any> = new EventEmitter();

  selectItem(event, item: SelectedDataOptions) {
    if (event) {
      event.preventDefault();
    }

    this.onTagItemSelect.emit(item);
  }

  _onClickedOutside(event) {
    this.onClickedOutside.emit(event);
  }

}
