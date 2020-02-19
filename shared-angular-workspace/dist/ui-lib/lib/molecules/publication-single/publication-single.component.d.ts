import { EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Avatar } from '../../../core/models/avatar';
import { PublicationDataOptions } from '../../../core/models/publicationData';
import { ListItemOptions } from '../../../core/models/listItem';
import { TranslateService } from '@ngx-translate/core';
import { AnimationProperties } from '../../../core/models/animation-options';
declare enum PublicationSingleType {
    follow = "follow",
    invitation = "invitation",
    search = "list",
    staff = "staff"
}
export declare class PublicationSingleComponent implements OnInit, OnChanges, OnDestroy {
    translateService: TranslateService;
    type: PublicationSingleType;
    publicationData: PublicationDataOptions;
    userNotificationData: ListItemOptions;
    className: string;
    isOwner: boolean;
    follow: EventEmitter<any>;
    invitationAnswer: EventEmitter<any>;
    getPublicationSlug: EventEmitter<any>;
    getSelectedMember: EventEmitter<any>;
    onNotificationClick: EventEmitter<any>;
    avatarData: Avatar;
    animationAction: boolean;
    animationOptions: AnimationProperties | any;
    private unsubscribe$;
    statusList: {
        1: any;
        2: any;
        3: any;
    };
    constructor(translateService: TranslateService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    buildAvatarData(): void;
    onFollow(follow: any): void;
    invAnswer(answer: any): void;
    getPublicationData(event: any): void;
    _getSelectedMember(member: any): void;
    _onNotificationClick(data: any): void;
    animate(animate: boolean): void;
    createOptions(name: string): any;
    ngOnDestroy(): void;
}
export {};
