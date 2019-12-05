import { EventEmitter, OnInit } from '@angular/core';
import { BoostContentDataOptions } from '../../../core/models/boostContentData';
import { TranslateService } from '@ngx-translate/core';
export declare class BoostContentSingleComponent implements OnInit {
    translate: TranslateService;
    boostContentData: BoostContentDataOptions;
    className: string;
    boostClick: EventEmitter<any>;
    contentClick: EventEmitter<any>;
    activeList: any[];
    passiveList: any[];
    openDropdown: boolean;
    constructor(translate: TranslateService);
    ngOnInit(): void;
    getTitleFirstChar(): string;
    onBoostClick(event: any, type: any, hash?: any): void;
    onContentClick(event: any): void;
    toggleActive(): void;
}
