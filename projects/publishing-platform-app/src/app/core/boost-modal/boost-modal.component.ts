import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AccountService } from '../services/account.service';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-boost-modal',
  templateUrl: 'boost-modal.component.html',
  styleUrls: ['./boost-modal.component.scss']
})
export class BoostModalComponent implements OnInit, OnChanges, OnDestroy {
  @Output() closeBoostedModal = new EventEmitter<any>();
  @Output() cancelBoost = new EventEmitter<any>();
  @Output() newBoost = new EventEmitter<any>();
  @Input() modalType: string;
  @Input() boostFee: number = 0;
  @Input() resetModal: boolean = false;
  public boostTab = [
    {
      'value': '1',
      'text': `1 ${this.translateService.instant('boost-modal.day')}` // '1 Day'
    },
    {
      'value': '3',
      'text': `3 ${this.translateService.instant('boost-modal.days')}` // '3 Days',
    },
    {
      'value': '7',
      'text': `7 ${this.translateService.instant('boost-modal.days')}` // '7 Days',
    }
  ];
  public boostPrice: number;
  public boostDays: number;
  public boostPassword: string = '';
  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(
    public accountService: AccountService,
    public translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit() {
    this.initDefaultData();
    this.translateService.onLangChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lang => {
        this.boostTab = [
          {
            'value': '1',
            'text': `1 ${this.translateService.instant('boost-modal.day')}` // '1 Day'
          },
          {
            'value': '3',
            'text': `3 ${this.translateService.instant('boost-modal.days')}` // '3 Days',
          },
          {
            'value': '7',
            'text': `7 ${this.translateService.instant('boost-modal.days')}` // '7 Days',
          }
        ];
      });
    fromEvent(this.document, 'keydown')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event) => {
        if (event['key'] === 'Escape') {
          this.closeBoostModal(event);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.resetModal && changes.resetModal.currentValue) {
      this.initDefaultData();
    }
  }

  initDefaultData() {
    this.boostPrice = 50;
    this.boostDays = 1;
    this.translateService.onLangChange.subscribe(lang => {
      this.boostTab = [
        {
          'value': '1',
          'text': `1 ${this.translateService.instant('boost-modal.day')}` // '1 Day'
        },
        {
          'value': '3',
          'text': `3 ${this.translateService.instant('boost-modal.days')}` // '3 Days',
        },
        {
          'value': '7',
          'text': `7 ${this.translateService.instant('boost-modal.days')}` // '7 Days',
        }
      ];
    });
  }

  onRangeChange(event) {
    this.boostPrice = event.target.value;
  }

  boostTabChange(e) {
    this.boostDays = e;
  }

  closeBoostModal(e) {
    this.closeBoostedModal.emit(e);
  }

  onInputChange(event) {
    this.boostPassword = event.value;
  }

  cancelBoostSubmit() {
    this.cancelBoost.emit(this.boostPassword);
  }

  addBoostSubmit() {
    this.newBoost.emit({'boostDays': this.boostDays, 'boostPrice': this.boostPrice, 'password': this.boostPassword});
  }

  ngOnDestroy(): void {
    this.boostPassword = '';
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
