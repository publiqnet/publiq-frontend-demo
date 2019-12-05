import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [FormControlHelper.controlValueAccessor(InputComponent)]
})
export class InputComponent extends FormControlHelper {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() inputValue: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() className: string = 'test-class';
  @Input() inputId: string = '';
  @Output() _onChange = new EventEmitter<any>();
  @Output() inputBtnClicked = new EventEmitter<any>();

  onInputChange(event) {
    this.onChange(event.target.value);
    this._onChange.emit({'value': event.target.value});
  }

  handleBtnClick(event) {
    this.inputBtnClicked.emit({'isClicked': true});
  }

  getClassNames () {
    const classes = [];
    const types = [];
    const values = [];

    if (this.type && ['button', 'checkbox', 'email', 'number', 'password', 'radio', 'submit', 'text', 'hidden'].indexOf(this.type) !== -1) {
      types.push(this.type);
    }

    if (this.inputValue && ['button', 'checkbox', 'email', 'number', 'password', 'radio', 'submit', 'text'].indexOf(this.type) !== -1) {
      values.push(this.inputValue);
    }

    return classes;
  }
}
