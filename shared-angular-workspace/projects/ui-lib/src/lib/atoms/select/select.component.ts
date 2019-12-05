import { Component, Input } from '@angular/core';
import { SelectOptions } from '../../../core/models/select';

@Component({
  selector: 'ui-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent {
  @Input() multiple: boolean = false;
  @Input() optionsData: SelectOptions[];
  @Input() className: string;
}
