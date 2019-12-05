import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-view-count',
  templateUrl: './view-count.component.html',
  styleUrls: ['./view-count.component.scss'],
})

export class ViewCountComponent {
  @Input() text: string = '25K';
  @Input() className: string = '';
  @Input() iconClassName: string = '';
}
