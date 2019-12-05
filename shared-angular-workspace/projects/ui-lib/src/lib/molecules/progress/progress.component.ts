import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';

@Component({
  selector: 'ui-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  providers: [FormControlHelper.controlValueAccessor(ProgressComponent)]
})

export class ProgressComponent extends FormControlHelper implements OnChanges {
  @Input() className: string = '';
  @Input() minValue: number = 0;
  @Input() maxValue: number = 50;
  @Input() defaultValue: number = 30;
  @Input() titleName: string = 'pbq';
  selectedValue: string;
  @Output() onRange = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultValue && changes.defaultValue.currentValue) {
      this.defaultValue = changes.defaultValue.currentValue;
      this.selectedValue = this.defaultValue.toString();
    }
  }

  onRangeChange(event) {
    this.selectedValue = event.target.value;
    this.onChange(this.selectedValue);
    this.onRange.emit(event);
  }
}

