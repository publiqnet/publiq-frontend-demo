import { EventEmitter } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';
export declare class ToggleComponent extends FormControlHelper {
    className: string;
    isChecked: boolean;
    onToggle: EventEmitter<any>;
    onToggleChange(event: any): void;
}
