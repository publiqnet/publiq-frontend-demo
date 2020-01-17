import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss']
})

export class DraggableComponent {
  @Output() cancelReposition = new EventEmitter<any>();
  @Output() saveReposition = new EventEmitter<any>();
  public isLoading = false;

  constructor() {}

  onCancel(event: any) {
    this.cancelReposition.emit(true);
  }
  onSave(event: any) {
    this.isLoading = true;
    this.saveReposition.emit(true);
  }
}
