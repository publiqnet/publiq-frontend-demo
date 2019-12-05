import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() text: string = '';
  @Input() avatarData = null;
  @Input() removeButton: boolean = true;
  @Input() className: string = null;
  @Output() onRemove = new EventEmitter<any>();
}
