import { EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ContentDataOptions } from '../../../core/models/contentData';
import { HeaderLoggedDataOptions } from '../../../core/models/headerLoggedData';
import { DropdownDataOptions } from '../../../core/models/dropdownData';
import { TranslateService } from '@ngx-translate/core';
declare enum ContentSingleType {
    related = "related",
    single = "single",
    grid = "grid",
    edit = "edit"
}
export declare class ContentSingleComponent implements OnInit, OnChanges {
    translateService: TranslateService;
    type: ContentSingleType;
    contentData: ContentDataOptions;
    publicationList: any[];
    optionsData: DropdownDataOptions[];
    className: string;
    hasBoost: boolean;
    imageArrowsShown: boolean;
    canEditContent: boolean;
    canOnlyDelete: boolean;
    tagItems: HeaderLoggedDataOptions[];
    loadOriginalImg: boolean;
    onTagItemSelect: EventEmitter<any>;
    onPublicationSelect: EventEmitter<any>;
    changeImageShown: boolean;
    publicationClick: EventEmitter<any>;
    contentClick: EventEmitter<any>;
    accountClick: EventEmitter<any>;
    tagClick: EventEmitter<any>;
    likeClick: EventEmitter<any>;
    boostClick: EventEmitter<any>;
    editClick: EventEmitter<any>;
    historyClick: EventEmitter<any>;
    publicationsListClick: EventEmitter<any>;
    imageArrowClick: EventEmitter<any>;
    changeImageClick: EventEmitter<any>;
    imageLoaded: EventEmitter<any>;
    toggleHistoryIcon: boolean;
    thumbnailLoaded: boolean;
    originalImageLoaded: boolean;
    imageUri: string;
    menuOpen: {
        publication: boolean;
        settings: boolean;
    };
    dropdownSettings: {
        text: any;
        value: string;
    }[];
    constructor(translateService: TranslateService);
    ngOnInit(): void;
    selectTagValue(event: any): void;
    selectPublication(event: any): void;
    closeMenu(): void;
    passClick(type: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    getTitleFirstChar(): string;
    onPublicationClick(event: any): void;
    onBoostClick(event: any): void;
    onEditClick(event: any): void;
    onBtnClick(event: any): void;
    onContentClick(event: any): void;
    onAccountClick(event: any): void;
    onTagClick(event: any, tag: any): void;
    onLikeClick(event: any, uri: any): void;
    onHistoryClick(event: any, slug: any): void;
    onPublicationsListClick(event: any): void;
    onChangeImageClick(event: any): void;
    onImageArrowClick(diff: any): void;
    onImageError(event: any, imgTye: string): void;
    onImageLoaded(event: Event, imgTye: string): void;
    showOriginal(): boolean;
    showThumbnail(): boolean;
    showSkeleton(): boolean;
}
export {};
