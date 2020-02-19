import { EventEmitter, OnChanges, SimpleChanges, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';
declare enum ProgressType {
    default = "default",
    amount = "amount",
    days = "days"
}
export declare class ProgressComponent extends FormControlHelper implements AfterViewInit, OnChanges, OnDestroy {
    type: ProgressType;
    className: string;
    minValue: number;
    maxValue: number;
    defaultValue: number;
    selectedAmountValue: string;
    selectedDaysValue: string;
    daysRange: ElementRef;
    daysValue: ElementRef;
    amountRange: ElementRef;
    amountValue: ElementRef;
    onDaysRange: EventEmitter<any>;
    onAmountRange: EventEmitter<any>;
    private unsubscribe$;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onDaysRangeChange(value: any): void;
    onAmountRangeChange(value: any): void;
    ngOnDestroy(): void;
}
export {};
