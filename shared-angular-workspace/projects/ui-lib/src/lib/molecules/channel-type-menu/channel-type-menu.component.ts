import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-channel-type-menu',
  templateUrl: './channel-type-menu.component.html',
  styleUrls: ['./channel-type-menu.component.scss'],
})

export class ChannelTypeMenuComponent {
  @Input() isPrivate: boolean = true;
  @Output() onItemSelect: EventEmitter<any> = new EventEmitter<any>();

  setIsPrivate(event, isPrivate) {
    if (event) {
      event.preventDefault();
    }

    this.onItemSelect.emit({'isPrivate': isPrivate});
  }
}
