import { Component, EventEmitter, Input, Output } from '@angular/core';

enum MessageState {
  default = 'default',
  invalid = 'invalid',
  sent = 'sent',
  alread_have = 'already_have'
}

enum MessageType {
  welcome_to_media = 'welcome_to_media',
  welcome_to_media_loading = 'welcome_to_media_loading',
  start_earning = 'start_earning'
}

@Component({
  selector: 'ui-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss'],
})
export class WelcomeMessageComponent {
  @Input() type: MessageType = null;
  @Input() state: MessageState = MessageState.default;
  @Output() onClosed: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  public emailAddress;

  _onClosed() {
    this.onClosed.emit(null);
  }

  _onSubmit(event) {
    this.onSubmit.emit(this.type === MessageType.welcome_to_media ? this.emailAddress : event);
  }
}
