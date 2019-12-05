import { NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationProperties } from '../../../core/models/animation-options';
export declare class IconComponent implements OnInit, OnChanges {
    private ngZone;
    size: number;
    animationOptions: AnimationProperties;
    action: boolean;
    private animationItem;
    constructor(ngZone: NgZone);
    options: AnimationOptions;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    animationCreated(animationItem: AnimationItem): void;
    playAnimation(): void;
}
