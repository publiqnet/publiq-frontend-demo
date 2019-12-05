import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

export class FormControlHelper {

  constructor() {}

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  private innerValue: any = '';

  static controlValueAccessor(controlValueComponent) {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => controlValueComponent),
      multi: true
    };
  }

  onChange(value: any) {
    // @ts-ignore
    this.innerValue = value;
    this.propagateChange(this.innerValue);
  }

  propagateChange = (_: any) => { };

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {}
}
