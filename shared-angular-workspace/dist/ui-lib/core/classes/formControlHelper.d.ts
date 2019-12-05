export declare class FormControlHelper {
    constructor();
    value: any;
    private innerValue;
    static controlValueAccessor(controlValueComponent: any): {
        provide: import("@angular/core").InjectionToken<import("@angular/forms").ControlValueAccessor>;
        useExisting: import("@angular/core").Type<any>;
        multi: boolean;
    };
    onChange(value: any): void;
    propagateChange: (_: any) => void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
