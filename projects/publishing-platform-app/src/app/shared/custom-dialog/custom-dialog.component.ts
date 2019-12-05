import { Component, OnInit, Output, Input, EventEmitter, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent implements OnInit {
  @Output() closeConfirmModal: any = new EventEmitter<any>();
  @Input('properties') properties: any;
  @Input('case') case: any;
  nameControl: FormControl = new FormControl('', [Validators.required]);
  nameError: boolean;
  closeHistory: boolean = false;

  constructor(private router: Router,
              private translateService: TranslateService) {}

  ngOnInit(): void {
    this.nameControl.valueChanges.subscribe(
      () => {
        this.nameError = false;
      }
    );
  }

  closeModal(answer?: boolean) {
    if (this.case == 'set-name') {
      if (answer && this.nameControl.invalid) {
        this.nameError = true;
        return;
      }
      answer ? this.closeConfirmModal.emit({ answer, name: this.nameControl.value }) : this.closeConfirmModal.emit({ answer });
    } else {
      answer ? this.closeConfirmModal.emit({ answer, properties: this.properties }) : this.closeConfirmModal.emit({ answer });
    }
    if (this.case == 'history') {
      this.closeConfirmModal.emit({closeHistory: true});
      return;
    }
  }

  onHistoryClick(uri: string) {
    this.closeConfirmModal.emit({closeHistory: true});
    this.router.navigate([`/s/${uri}`]);
    return;
  }

  public onOutSideClick() {
    if (this.case == 'history') {
      if (this.closeHistory) {
        this.closeConfirmModal.emit({closeHistory: true});
        return;
      }
      this.closeHistory = true;
    }
  }
}
