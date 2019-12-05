import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';

@Component({
  selector: 'ui-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [FormControlHelper.controlValueAccessor(ToggleComponent)]
})

export class ToggleComponent extends FormControlHelper {
  @Input() className: string = 'toggle-atom-container';
  @Input() isChecked: boolean = false;
  @Output() onToggle = new EventEmitter<any>();

  onToggleChange(event) {
    this.isChecked = !this.isChecked;
    this.onChange(this.isChecked);
    this.onToggle.emit({'isActive': this.isChecked});
  }
}
