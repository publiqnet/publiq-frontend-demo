import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
declare enum LoaderType {
    blue = "blue",
    grey = "grey",
    multi = "multi",
    white = "white"
}
export declare class LoaderComponent implements OnInit, OnChanges {
    constructor();
    type: LoaderType;
    size: number;
    color: string;
    options: AnimationOptions;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    animationCreated(animationItem: AnimationItem): void;
}
export {};
