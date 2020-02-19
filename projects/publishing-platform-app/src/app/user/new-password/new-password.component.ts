import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';

import { ReplaySubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ErrorEvent, ErrorService } from '../../core/services/error.service';
import { AccountService } from '../../core/services/account.service';
import { ValidationService } from '../../core/validator/validator.service';
import { OauthService } from 'helper-lib';
import { UtilService } from '../../core/services/util.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { UiNotificationService } from '../../core/services/ui-notification.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit, OnDestroy {
  @Input() brainKey: string;
  @Input() stringToSign: number;
  @Input() data: {} = {};
  @Output() closeModal = new EventEmitter<any>();
  public formView = 'formView';
  public recoverForm: FormGroup;
  public errorMessage = '';
  private unsubscribe$ = new ReplaySubject<void>(1);

  public passwordError = {
    length: null,
    uppercase: null,
    lowercase: null,
    number: null,
    matching: null
  };

  constructor(private accountService: AccountService,
              private oauthService: OauthService,
              private FormBuilder: FormBuilder,
              private router: Router,
              public translateService: TranslateService,
              private errorService: ErrorService,
              private uiNotificationService: UiNotificationService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.buildRecoverForm();
    this.errorService.errorEventEmiter
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe((data: ErrorEvent) => {
        this.formView = 'formView';
        this.errorMessage = data.message;
      });

    this.accountService.recoverDataChanged
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
      this.formView = 'success';
    });
  }

  recover() {
    if (this.recoverForm.invalid) {
      return;
    }
    this.formView = '';
    this.oauthService.recoverComplete(this.brainKey, this.stringToSign, this.recoverForm.value.password)
      .pipe(
        switchMap((data: any) => {
          this.accountService.brainKeyEncrypted = data.brainKey;
          return this.accountService.accountAuthenticate(data.token);
        }),
        takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId) && UtilService.getCookie('redirectUrl')) {
          const redirectUrl = UtilService.getCookie('redirectUrl');
          const urlTree: UrlTree = this.router.parseUrl(redirectUrl);
          this.router.navigateByUrl(urlTree);
          UtilService.removeCookie('redirectUrl');
        } else if (this.data['page'] && this.data['page'] === 'author') {
          this.closeModal.emit('close');
          this.uiNotificationService.success(this.translateService.instant('author.success'));
        } else {
          this.router.navigate(['/']);
        }
      }, (err) => {
        this.errorService.handleError('login', {status: 404});
      });
  }

  private buildRecoverForm() {
    this.recoverForm = this.FormBuilder.group({
      'password': new FormControl('', [
        Validators.required,
        ValidationService.passwordValidator
      ]),
      'confirmPassword': new FormControl('', [
        Validators.required,
        ValidationService.passwordValidator
      ]),
    },
      {validator: ValidationService.passwordsEqualValidator
    });

    this.recoverForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.passwordValidation.bind(this));
  }

  passwordValidation(form) {
    this.passwordError.length = form.password.length < 8;
    this.passwordError.number = !form.password.match(/\d/);
    this.passwordError.uppercase = !form.password.match(/[A-Z]/);
    this.passwordError.lowercase = !form.password.match(/[a-z]/);
    this.passwordError.matching = form.password !== '' && form.password !== form.confirmPassword || null;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
