import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-earning-popup',
  templateUrl: 'start-earning-popup.component.html',
  styleUrls: ['./start-earning-popup.component.scss']
})
export class StartEarningPopupComponent {
  @Output('onButtonClicked') onButtonClicked = new EventEmitter<any>();
  @Output('onClosed') onClosed = new EventEmitter<any>();

  constructor(
    private router: Router
  ) {

  }
}
