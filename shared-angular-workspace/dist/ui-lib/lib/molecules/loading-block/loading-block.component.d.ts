import { AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
export declare class LoadingBlockComponent implements AfterViewInit, OnChanges {
    type: string;
    className: string;
    isGrid: boolean;
    isSingle: boolean;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
