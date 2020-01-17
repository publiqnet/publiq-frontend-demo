import { EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NotificationOptions } from '../../../core/models/notificationMenu';
import { TranslateService } from '@ngx-translate/core';
export declare enum Actions {
    User = "performer",
    Publication = "target",
    Redirect_User = "redirect-user",
    Redirect_Publication = "redirect-publication"
}
export declare class NotificationMenuComponent implements OnInit, OnChanges {
    translateService: TranslateService;
    items: NotificationOptions[];
    blockInfiniteScroll: boolean;
    seeMoreLoading: boolean;
    onItemSelect: EventEmitter<any>;
    seeMore: EventEmitter<any>;
    constructor(translateService: TranslateService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    selectItem(event: any, item: any): void;
    formatDate(date: any): string;
    seeMoreNots(event: any): void;
    private transform;
    private changeKeys;
    onBodyClick(event: any): void;
    private makeAction;
}
