import { OnInit, EventEmitter } from '@angular/core';
import { Avatar } from '../../../core/models/avatar';
export declare class PublicationMembersComponent implements OnInit {
    membersData: Avatar[];
    className: string;
    iconClassName: string;
    getMember: EventEmitter<any>;
    ngOnInit(): void;
    getMembersInfo(): void;
    getMemberData(member: any): void;
}
