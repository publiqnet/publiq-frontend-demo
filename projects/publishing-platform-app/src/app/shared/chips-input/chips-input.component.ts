import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipsInputComponent implements OnInit, OnChanges {
  @Input() tagsArray = [];
  @Input() placeholder = '';
  @Input() length;
  @Output() change = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() keyupEnter = new EventEmitter();
  @ViewChild('chipdDiv', { static: false }) chipDiv: ElementRef;
  textControl: FormControl = new FormControl();
  constructor() { }

  ngOnInit() {
    this.textControl.valueChanges.
      subscribe(
        res => {
          if (this.textControl.value.trim()) {
            if (this.length && this.textControl.value.length < this.length) {
              this.change.emit(res.trim());
            } else if (!this.length) {
              this.change.emit(res.trim());
            }
          }
        }
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('tagsArray' in changes) {
      this.textControl.setValue('');
      setTimeout(() => {
        this.chipDiv.nativeElement.scrollTo(1200, 0);
      }, 0);
    }
  }

  enterKeyup() {
    if (!this.textControl.value.trim()) {
      this.textControl.setValue('');
      return;
    }
    if (this.length && this.textControl.value.length > this.length) {
      this.textControl.setValue('');
      return;
    }
    this.textControl.setValue(this.textControl.value.trim());
    this.keyupEnter.emit();
    this.textControl.setValue('');
  }

  removeChip(index) {
    this.remove.emit(index);
    this.textControl.setValue('');
  }

  keyup(e) {
    if (e.key == ',') {
      this.textControl.setValue(this.textControl.value.slice(0, -1));
      this.enterKeyup();
    }
  }
}
