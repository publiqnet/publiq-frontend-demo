import { ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
export declare class ClickOutsideDirective implements OnInit, OnDestroy {
    private _elementRef;
    private platformId;
    _onClick: any;
    constructor(_elementRef: ElementRef, platformId: Object);
    uiClickOutside: EventEmitter<{}>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onClick(event: any): void;
}
