import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';
export declare class ProgressComponent extends FormControlHelper implements OnChanges {
    className: string;
    minValue: number;
    maxValue: number;
    defaultValue: number;
    titleName: string;
    selectedValue: string;
    onRange: EventEmitter<any>;
    ngOnChanges(changes: SimpleChanges): void;
    onRangeChange(event: any): void;
}
