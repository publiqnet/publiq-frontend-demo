import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, Renderer2 } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [FormControlHelper.controlValueAccessor(InputComponent)]
})
export class InputComponent extends FormControlHelper implements OnChanges, AfterViewInit {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() inputValue: string = '';
  @Input() disabled: boolean = false;
  @Input() autocomplete: string = 'off';
  @Input() readonly: boolean = false;
  @Input() className: string = '';
  @Input() inputId: string = '';
  @Input() minValue: number = 0;
  @Input() maxValue: number;
  @Output() _onChange = new EventEmitter<any>();
  @Output() inputBtnClicked = new EventEmitter<any>();
  @ViewChild('inputElement', {static: false}) inputElement: ElementRef;
  public currentValue: string = '';

  constructor(private renderer: Renderer2) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.inputValue && changes.inputValue.currentValue) {
      let value = changes.inputValue.currentValue;
      if (this.type == 'number') {
        value = Number(value);
      }
      this.currentValue = value;
      if (this.currentValue != this.inputValue) {
        this.inputValue = this.currentValue;
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.type == 'number') {
      this.renderer.setAttribute(this.inputElement.nativeElement, 'min', '' + this.minValue);
      if (this.maxValue) {
        this.renderer.setAttribute(this.inputElement.nativeElement, 'max', '' + this.maxValue);
      }
    }
  }

  detectChange(event) {
    if (this.type == 'number' && event && event.target && event.target.value) {
      if (event.target.value > this.maxValue) {
        event.target.value = this.maxValue;
        return false;
      }
      if (event.target.value < this.minValue) {
        event.preventDefault();
        event.target.value = this.minValue;
        return false;
      }
    }
  }

  onInputChange(event) {
    let value = event.target.value;
    if (this.type == 'number') {
      value = Number(value);
    }
    if (this.currentValue != value) {
      this.currentValue = value;
      this.onChange(value);
      this._onChange.emit({'value': value});
    }
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
