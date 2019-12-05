import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-datum',
  templateUrl: './datum.component.html',
  styleUrls: ['./datum.component.scss']
})

export class DatumComponent {
  @Input() count: any = '11';
  @Input() property: any = 'stories';
  @Input() className: string = '';
  @Input() iconClassName: string = '';
}
