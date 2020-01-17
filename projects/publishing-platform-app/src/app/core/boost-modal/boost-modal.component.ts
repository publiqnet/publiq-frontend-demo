import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AccountService } from '../services/account.service';
import { TranslateService } from '@ngx-translate/core';
import { DecimalPipe, DOCUMENT } from '@angular/common';
import { fromEvent, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContentService } from '../services/content.service';
import { UtilsService } from 'shared-lib';
import { UtilService } from '../services/util.service';
import { UiNotificationService } from '../services/ui-notification.service';

@Component({
  selector: 'app-boost-modal',
  templateUrl: 'boost-modal.component.html',
  styleUrls: ['./boost-modal.component.scss']
})
export class BoostModalComponent implements OnInit, OnChanges, OnDestroy {
  @Output() closeBoostedModal = new EventEmitter<any>();
  @Output() cancelBoost = new EventEmitter<any>();
  @Output() submittedBoost = new EventEmitter<any>();
  @Input() cancelHash: string;
  @Input() modalType: string;
  @Input() boostFee: number = 0;
  @Input() contentUri: any = '';
  public submitError: boolean = false;
  public feeWhole: number = 0;
  public feeFraction: number = 0;
  public currentBoostFee: number = 0;
  public currentTime: number;
  public chosenPrice: number = 0;
  public chosenPriceProgress: number = 0;
  public chosenDay: number;
  public maxBoostPrice: number;
  public boostDays: number;
  public boostPassword: string = '';
  public boostSubmitError: boolean = false;
  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(
    public accountService: AccountService,
    public translateService: TranslateService,
    private contentService: ContentService,
    public utilService: UtilService,
    private uiNotificationService: UiNotificationService,
    @Inject(DOCUMENT) private document: Document,
    private decimalPipe: DecimalPipe,
  ) {
  }

  ngOnInit() {
    this.initDefaultData();
    this.loadCurrentBoostFee();
    this.translateService.onLangChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lang => {
      });
    fromEvent(this.document, 'keydown')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event) => {
        if (event['key'] === 'Escape') {
          this.closeBoostModal(event);
        }
      });

    this.accountService.accountUpdated$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) {
          this.maxBoostPrice = Math.floor(this.accountService.accountInfo.balance - this.boostFee);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.resetModal && changes.resetModal.currentValue) {
        this.initDefaultData();
      }
      if (changes.submitError && changes.submitError.currentValue) {
        this.submitError = changes.submitError.currentValue;
      }
    }
  }

  initDefaultData() {
    this.boostDays = 1;
    this.translateService.onLangChange.subscribe(lang => {
    });
    this.boostPassword = '';
    this.submitError = false;
  }

  loadCurrentBoostFee() {
    this.contentService.getFee()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(feeData => {
        this.feeWhole = feeData.whole ? feeData.whole : 0;
        this.feeFraction = feeData.fraction ? feeData.fraction : 0;
        this.currentTime = feeData.currentTime;
        this.currentBoostFee = UtilsService.calculateBalance(this.feeWhole, this.feeFraction);
      });
  }

  onRangeChange(data) {
    if (Math.round(data) != Math.round(this.chosenPrice)) {
      this.chosenPrice = data;
    }
  }

  onDaysChange(data) {
    this.chosenDay = data;
  }

  closeBoostModal(e) {
    this.boostPassword = '';
    this.submitError = false;
    this.chosenPrice = this.chosenPriceProgress = 0;
    this.chosenDay = 1;
    this.closeBoostedModal.emit(e);
  }

  onInputChange(event) {
    this.boostPassword = event.value;
    this.submitError = false;
  }

  cancelBoostSubmit() {
    if (!this.boostPassword) {
      this.submitError = true;
      return false;
    }
    if (this.boostPassword) {
      this.contentService.cancelStoryBoosting(this.contentUri, this.cancelHash, this.feeWhole, this.feeFraction, this.currentTime, this.boostPassword)
        .subscribe(data => {
          this.uiNotificationService.success(this.translateService.instant('author.success'), this.translateService.instant('author.boost_successfully_canceled'));
          this.cancelBoost.emit('cancel');
          },
          error => {
            if (error && error.error && error.error.type) {
              if (error.error.type == 'boost_invalid_signature') {
                this.boostSubmitError = true;
                this.uiNotificationService.error(this.translateService.instant('author.error'), this.translateService.instant('author.content_boost_error'));
              } else if (error.error.type == 'boost_not_enough_balance') {
                this.uiNotificationService.error(this.translateService.instant('author.error'),  this.translateService.instant('author.balance_not_enough'));
              } else {
                this.uiNotificationService.error(this.translateService.instant('author.system_error'), '');
              }
            } else {
              this.uiNotificationService.error(this.translateService.instant('author.system_error'), '');
            }
          });
    }
  }

  addBoostSubmit() {
    if (!this.boostPassword) {
      this.submitError = true;
      return false;
    }
    if (this.boostPassword && this.modalType == 'boost') {
      this.contentService.contentBoost(this.contentUri, this.chosenPrice, this.chosenDay, this.feeWhole, this.feeFraction, this.currentTime, this.boostPassword)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(data => {
          this.submittedBoost.emit('submitted');
            this.uiNotificationService.success(this.translateService.instant('author.success'), this.translateService.instant('author.boost_successfully_added'));
          },
          error => {
            if (error && error.error && error.error.type) {
              if (error.error.type == 'boost_invalid_signature') {
                this.boostSubmitError = true;
                this.uiNotificationService.error(this.translateService.instant('author.error'), this.translateService.instant('author.content_boost_error'));
              } else if (error.error.type == 'boost_not_enough_balance') {
                this.uiNotificationService.error(this.translateService.instant('author.error'),  this.translateService.instant('author.balance_not_enough'));
              } else {
                this.uiNotificationService.error(this.translateService.instant('author.system_error'), '');
              }
            } else {
              this.uiNotificationService.error(this.translateService.instant('author.system_error'), '');
            }
          });
    }
  }

  detectValue(data) {
    if (this.chosenPrice != data.value) {
      this.chosenPrice = data.value;
    }

    if (this.chosenPriceProgress != Math.round(data.value)) {
      this.chosenPriceProgress = Math.round(data.value);
    }
  }

  ngOnDestroy(): void {
    this.boostPassword = '';
    this.submitError = false;
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
