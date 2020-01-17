import { AfterViewInit, ElementRef, EventEmitter, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';
export declare class InputComponent extends FormControlHelper implements OnChanges, AfterViewInit {
    private renderer;
    placeholder: string;
    type: string;
    inputValue: string;
    disabled: boolean;
    autocomplete: string;
    readonly: boolean;
    className: string;
    inputId: string;
    minValue: number;
    maxValue: number;
    _onChange: EventEmitter<any>;
    inputBtnClicked: EventEmitter<any>;
    inputElement: ElementRef;
    currentValue: string;
    constructor(renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    detectChange(event: any): boolean;
    onInputChange(event: any): void;
    handleBtnClick(event: any): void;
    getClassNames(): any[];
}
