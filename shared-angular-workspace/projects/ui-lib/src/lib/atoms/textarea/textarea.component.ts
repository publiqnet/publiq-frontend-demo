import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';

@Component({
  selector: 'ui-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [FormControlHelper.controlValueAccessor(TextareaComponent)]
})

export class TextareaComponent extends FormControlHelper {
  @Input() placeholder: string = '';
  @Input() rows: number;
  @Input() cols: number;
  @Input() maxlength: number;
  @Input('resize') resize: boolean = false;
  @Input() className: string = '';

  getClassNames () {

    const classes = [];

    if (this.resize) {
      classes.push(`textarea--resize`);
    }

    return classes;
  }
}
