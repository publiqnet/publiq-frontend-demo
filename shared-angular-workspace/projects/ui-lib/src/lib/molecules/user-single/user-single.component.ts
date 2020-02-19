import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Avatar } from '../../../core/models/avatar';
import { ListItemOptions } from '../../../core/models/listItem';
import { DropdownRoleDataOptions } from '../../../core/models/dropdownRoleData';
import { UserSingleTypeOptions } from '../../../core/models/userSingle';

enum UserSingleCardType {
  followers = 'followers',
  'two-actions' = 'two-actions',
  role = 'role',
  notification = 'notification',
}

@Component({
  selector: 'ui-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss'],
})

export class UserSingleComponent implements OnChanges {
  @Input('type') type: UserSingleCardType = UserSingleCardType.followers;
  @Input('userData') userData: UserSingleTypeOptions = null;
  @Input() userRoleData: DropdownRoleDataOptions = null;
  @Input() userNotificationData: ListItemOptions = null;
  @Input() className: string = '';
  @Input() isOwner: boolean = false;
  @Input() dropdownOpen: boolean = true;
  @Input() showFollowButton: boolean = true;
  @Input() hasEditPermission: boolean = true;
  @Output() onFollowChange = new EventEmitter<any>();
  @Output() onUserClick = new EventEmitter<any>();
  @Output() onRoleClick = new EventEmitter<any>();
  @Output() onNotificationClick = new EventEmitter<any>();
  @Output() follow = new EventEmitter<any>();

  // two-actions
  @Input() primaryButtonText: string = '';
  @Input() secondaryButtonText: string = '';
  @Output() onPrimaryClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSecondaryClicked: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userData && this.userData.user) {
      this.userData.user = new Avatar(this.userData.user);
    }
  }

  _onFollowChange(follow, isFollowing = true) {
    this.userData.isFollowing = isFollowing;
    this.onFollowChange.emit(follow);
  }

  userInfo(data) {
    this.onUserClick.emit(data);
  }

  _onRoleClick($event) {
    this.onRoleClick.emit($event);
  }

  _onNotificationClick(data) {
    this.onNotificationClick.emit(data);
  }

  onFollow(follow) {
    this.follow.emit({ slug: this.userData.slug, follow: follow });
  }

  _dropdownOpen() {
    this.dropdownOpen = false;
  }
}
