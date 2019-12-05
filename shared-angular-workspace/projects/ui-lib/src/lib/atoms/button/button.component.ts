import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: string = 'ordinary';
  @Input() size: string = null;
  @Input() iconClassName: string = null;
  @Input() fullRadius: boolean = false;
  @Input() iconButton: boolean = false;
  @Input() isFollowing: boolean = null;
  @Input() className: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean;
  @Output() btnClicked = new EventEmitter<any>();

  handleBtnClick(event) {
    this.btnClicked.emit({'isClicked': true});
  }

  getClassNames() {
    const classes = ['button'];

    if (this.iconButton) {
      classes.push(`button--icon`);
    }

    if (this.size && ['large', 'small', 'xsmall'].indexOf(this.size) !== -1) {
      classes.push(`button${this.iconButton ? '--icon' : ''}--${this.size}`);
    }

    if (this.type && ['primary', 'secondary'].indexOf(this.type) !== -1) {
      classes.push(`button--${this.type}`);
    }

    if (this.fullRadius && !this.iconButton) {
      classes.push(`button--full-radius`);
    }

    if (this.isFollowing) {
      classes.push('button--following');
    }

    if (this.className) {
      classes.push(this.className);
    }

    return classes;
  }
}
