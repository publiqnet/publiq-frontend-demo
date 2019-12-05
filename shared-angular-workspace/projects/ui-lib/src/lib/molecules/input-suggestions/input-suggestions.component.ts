import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-input-suggestions',
  templateUrl: './input-suggestions.component.html',
  styleUrls: ['./input-suggestions.component.scss']
})

export class InputSuggestionsComponent {
  @Input() suggestions: any = null;
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}

