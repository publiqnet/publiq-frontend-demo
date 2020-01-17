import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

enum ProgressType {
  default = 'default',
  amount = 'amount',
  days = 'days',
}

@Component({
  selector: 'ui-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  providers: [FormControlHelper.controlValueAccessor(ProgressComponent)]
})

export class ProgressComponent extends FormControlHelper implements AfterViewInit, OnChanges {
  @Input('type') type: ProgressType = ProgressType.default;
  @Input() className: string = '';
  @Input() minValue: number = 0;
  @Input() maxValue: number = 30;
  @Input() defaultValue: number = 0;
  selectedAmountValue: string;
  selectedDaysValue: string;
  @ViewChild('daysRange', {static: false}) daysRange: ElementRef;
  @ViewChild('daysValue', {static: false}) daysValue: ElementRef;
  @ViewChild('amountRange', {static: false}) amountRange: ElementRef;
  @ViewChild('amountValue', {static: false}) amountValue: ElementRef;
  @Output() onDaysRange = new EventEmitter<any>();
  @Output() onAmountRange = new EventEmitter<any>();

  ngAfterViewInit(): void {
    if (this.daysRange && this.daysRange.nativeElement && this.selectedDaysValue != this.daysRange.nativeElement.value) {
      setTimeout(() => {
        this.daysRange.nativeElement.value = this.selectedDaysValue;
        this.daysRange.nativeElement.dispatchEvent(new Event('input'));
      }, 0);
    }

    if (this.amountRange && this.amountRange.nativeElement && this.selectedAmountValue != this.amountRange.nativeElement.value) {
      setTimeout(() => {
        this.amountRange.nativeElement.value = this.selectedAmountValue ? this.selectedAmountValue : this.defaultValue;
        this.amountRange.nativeElement.dispatchEvent(new Event('input'));
      }, 0);
    }
    if (this.type === 'days' && this.daysRange) {
      fromEvent(this.daysRange.nativeElement, 'input')
        .subscribe(
          (event: KeyboardEvent) => {
            this.daysRange.nativeElement.innerHTML = event['srcElement']['value'];
            const bulletPosition = ((this.daysRange.nativeElement.value - this.daysRange.nativeElement.min) / (this.daysRange.nativeElement.max - this.daysRange.nativeElement.min));
            this.daysValue.nativeElement.style.left = (bulletPosition * (this.daysRange.nativeElement.offsetWidth - 10)) + 'px';
            this.selectedDaysValue = event['srcElement']['value'];
            this.onDaysRangeChange(this.selectedDaysValue);
          }
        );
    }

    if (this.type === 'amount' && this.amountRange) {
      fromEvent(this.amountRange.nativeElement, 'input')
        .subscribe(
          (event: KeyboardEvent) => {
            const bulletPosition = ((this.amountRange.nativeElement.value - this.amountRange.nativeElement.min) / (this.amountRange.nativeElement.max - this.amountRange.nativeElement.min));
            this.amountValue.nativeElement.style.left = (bulletPosition * (this.amountRange.nativeElement.offsetWidth - 10)) + 'px';
            this.selectedAmountValue = event['srcElement']['value'];
            this.onAmountRangeChange(this.selectedAmountValue);
          }
        );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultValue && changes.defaultValue.currentValue) {
      this.selectedDaysValue = changes.defaultValue.currentValue.toString();
      this.selectedAmountValue = changes.defaultValue.currentValue.toString();
      if (this.daysRange && this.daysRange.nativeElement) {
        this.daysRange.nativeElement.value = changes.defaultValue.currentValue;
        this.daysRange.nativeElement.dispatchEvent(new Event('input'));
      }
      if (this.amountRange && this.amountRange.nativeElement) {
        this.amountRange.nativeElement.value = changes.defaultValue.currentValue;
        this.amountRange.nativeElement.dispatchEvent(new Event('input'));
      }
    }
  }

  onDaysRangeChange(value) {
    this.selectedDaysValue = value;
    this.onChange(this.selectedDaysValue);
    this.onDaysRange.emit(this.selectedDaysValue);
  }

  onAmountRangeChange(value) {
    this.selectedAmountValue = value;
    this.onChange(this.selectedAmountValue);
    this.onAmountRange.emit(this.selectedAmountValue);
  }
}

