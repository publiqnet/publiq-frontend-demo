import { OnInit } from '@angular/core';
import { UtilService } from '../../../core/services/util.service';
import { Avatar } from '../../../core/models/avatar';
export declare class AvatarComponent implements OnInit {
    utilService: UtilService;
    avatarData: Avatar;
    isSquaric: boolean;
    size: string;
    loadOriginalImg: boolean;
    className: string;
    thumbnailLoaded: boolean;
    originalImageLoaded: boolean;
    constructor(utilService: UtilService);
    ngOnInit(): void;
    getClassNames(): any[];
    onImageError(event: any, imgTye: string): void;
    onImageLoaded(event: Event, imgTye: string): void;
    showLetters(): boolean;
    showOriginal(): boolean;
    showThumbnail(): boolean;
    showSkeleton(): boolean;
}
