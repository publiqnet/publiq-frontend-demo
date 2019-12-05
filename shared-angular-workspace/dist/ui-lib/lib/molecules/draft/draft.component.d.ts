import { EventEmitter, OnInit } from '@angular/core';
import { DraftDataOptions } from '../../../core/models/draftData';
import { UtilService } from '../../../core/services/util.service';
declare enum DraftTypes {
    single = "single"
}
export declare class DraftComponent implements OnInit {
    utilService: UtilService;
    type: DraftTypes;
    draftData: DraftDataOptions;
    className: string;
    contentClick: EventEmitter<any>;
    deleteClick: EventEmitter<any>;
    editClick: EventEmitter<any>;
    randomColor: string;
    constructor(utilService: UtilService);
    onDeleteClick(event: any): void;
    onEditClick(event: any): void;
    _contentClick(slug: any): void;
    ngOnInit(): void;
    defaultColors(): void;
    getDraftMainLetter(): string;
}
export {};
