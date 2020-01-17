import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Avatar } from '../../../core/models/avatar';

@Component({
  selector: 'ui-invitation-actions',
  templateUrl: './invitation-actions.component.html',
  styleUrls: ['./invitation-actions.component.scss']
})

export class InvitationActionsComponent implements OnInit {
  @Input('inviter') inviter: Avatar;
  @Input('className') className = '';
  @Output('actionSelected') actionSelected = new EventEmitter<any>();
  @Output('inviterClicked') inviterClicked = new EventEmitter<any>();

  ngOnInit() {
    this.inviter = new Avatar(this.inviter);
  }

  userClick(event) {
    event.preventDefault();
    this.inviterClicked.emit(this.inviter);
  }
}
