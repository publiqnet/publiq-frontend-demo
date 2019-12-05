import { EventEmitter } from '@angular/core';
export declare class RelevantContentComponent {
    type: string;
    title: string;
    contentList: any[];
    publicationClick: EventEmitter<any>;
    contentClick: EventEmitter<any>;
    accountClick: EventEmitter<any>;
    tagClick: EventEmitter<any>;
    likeClick: EventEmitter<any>;
    titleClassName: string;
    itemsClassName: string;
    titleClick: EventEmitter<any>;
    currentIndex: number;
    changeIndex(difference: any): void;
    onPublicationClick(event: any): void;
    onContentClick(event: any): void;
    onAccountClick(event: any): void;
    onTagClick(event: any): void;
    onTitleClick(): void;
    onLikeClick(event: any): void;
}
