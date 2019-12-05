import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ListItemOptions } from '../../../core/models/listItem';
import { DropdownRoleDataOptions } from '../../../core/models/dropdownRoleData';
import { UserSingleTypeOptions } from '../../../core/models/userSingle';
declare enum UserSingleCardType {
    followers = "followers",
    'two-actions' = "two-actions",
    role = "role",
    notification = "notification"
}
export declare class UserSingleComponent implements OnChanges {
    type: UserSingleCardType;
    userData: UserSingleTypeOptions;
    userRoleData: DropdownRoleDataOptions;
    userNotificationData: ListItemOptions;
    className: string;
    isOwner: boolean;
    dropdownOpen: boolean;
    showFollowButton: boolean;
    hasEditPermission: boolean;
    onFollowChange: EventEmitter<any>;
    onUserClick: EventEmitter<any>;
    onRoleClick: EventEmitter<any>;
    onNotificationClick: EventEmitter<any>;
    follow: EventEmitter<any>;
    primaryButtonText: string;
    secondaryButtonText: string;
    onPrimaryClicked: EventEmitter<any>;
    onSecondaryClicked: EventEmitter<any>;
    ngOnChanges(changes: SimpleChanges): void;
    _onFollowChange(follow: any, isFollowing?: boolean): void;
    userInfo(data: any): void;
    _onRoleClick($event: any): void;
    _onNotificationClick(data: any): void;
    onFollow(follow: any): void;
    _dropdownOpen(): void;
}
export {};
