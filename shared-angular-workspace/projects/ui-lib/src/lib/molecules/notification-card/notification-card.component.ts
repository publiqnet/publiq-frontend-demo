import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationCardDataOptions } from '../../../core/models/notificationCardData';

@Component({
  selector: 'ui-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
})

export class NotificationCardComponent implements AfterViewInit {
  @Input('cardData') cardData: NotificationCardDataOptions = null;
  @Input() className: string = '';
  @Output() visibility = new EventEmitter<boolean>();
  public active: boolean = false;
  public timer: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.openNotification();
  }

  openNotification() {
    this.timer = setTimeout(() => {
      this.active = true;
      this.closeNotification();
    }, 0);
  }

  closeNotification() {
    this.timer = setTimeout(() => {
      this.active = false;
      this.visibility.emit(true);
    }, this.cardData.duration ? this.cardData.duration : 2000);
  }

  onMouseOut() {
    if (this.active) {
      this.closeNotification();
    }
  }

  onCloseCard() {
    this.active = false;
    this.visibility.emit(true);
  }

  clearTime() {
    clearTimeout(this.timer);
  }
}
