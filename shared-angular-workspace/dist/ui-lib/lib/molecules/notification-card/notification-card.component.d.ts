import { AfterViewInit, EventEmitter } from '@angular/core';
import { NotificationCardDataOptions } from '../../../core/models/notificationCardData';
export declare class NotificationCardComponent implements AfterViewInit {
    cardData: NotificationCardDataOptions;
    className: string;
    visibility: EventEmitter<boolean>;
    active: boolean;
    timer: any;
    constructor();
    ngAfterViewInit(): void;
    openNotification(): void;
    closeNotification(): void;
    onMouseOut(): void;
    onCloseCard(): void;
    clearTime(): void;
}
