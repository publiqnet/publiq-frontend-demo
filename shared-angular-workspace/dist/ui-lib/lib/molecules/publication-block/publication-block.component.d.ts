import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PublicationDataOptions } from '../../../core/models/publicationData';
export declare class PublicationBlockComponent implements OnChanges {
    data: PublicationDataOptions[];
    countByPage: number;
    hasMore: boolean;
    className: string;
    loadMore: EventEmitter<any>;
    getPublication: EventEmitter<any>;
    onFollow: EventEmitter<any>;
    showData: PublicationDataOptions[];
    refreshAnimate: boolean;
    private lastIndex;
    rotateDeg: number;
    ngOnChanges(changes: SimpleChanges): void;
    _getPublication(event: any): void;
    _onFollow(event: any): void;
    updateActions(): void;
}
