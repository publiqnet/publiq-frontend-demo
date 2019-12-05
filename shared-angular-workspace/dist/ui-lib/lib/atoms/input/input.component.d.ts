import { EventEmitter } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';
export declare class InputComponent extends FormControlHelper {
    placeholder: string;
    type: string;
    inputValue: string;
    disabled: boolean;
    readonly: boolean;
    className: string;
    inputId: string;
    _onChange: EventEmitter<any>;
    inputBtnClicked: EventEmitter<any>;
    onInputChange(event: any): void;
    handleBtnClick(event: any): void;
    getClassNames(): any[];
}
