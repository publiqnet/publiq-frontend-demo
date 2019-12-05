import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-link',
  templateUrl: './link.component.html'
})

export class LinkComponent {
  @Input() linkText: string = '';
  @Input() href: string = '';
  @Input() target: string = '_blank';
  @Input() className: string = '';

  getClassNames () {
    const targets = [];

    if (this.target && ['_blank', '_parent', '_self', '_top'].indexOf(this.target) !== -1) {
      targets.push(this.target);
    }

    return targets;
  }
}
