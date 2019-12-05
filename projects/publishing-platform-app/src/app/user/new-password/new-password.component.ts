import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
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

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit, OnDestroy {
  @Input() brainKey: string;
  @Input() stringToSign: number;

  public formView = 'formView';
  public recoverForm: FormGroup;
  public errorMessage = '';


  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(private accountService: AccountService,
              private oauthService: OauthService,
              private FormBuilder: FormBuilder,
              private router: Router,
              public translateService: TranslateService,
              private errorService: ErrorService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.buildRecoverForm();
    this.errorService.errorEventEmiter
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: ErrorEvent) => {
        this.formView = 'formView';
        this.errorMessage = data.message;
      });

    this.accountService.recoverDataChanged.subscribe(() => {
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
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId) && UtilService.getCookie('redirectUrl')) {
          const redirectUrl = UtilService.getCookie('redirectUrl');
          const urlTree: UrlTree = this.router.parseUrl(redirectUrl);
          this.router.navigateByUrl(urlTree);
          UtilService.removeCookie('redirectUrl');
        } else {
          this.router.navigate(['/']);
        }
      }, (err) => {
        this.errorService.handleError('login', {status: 404});
      });
  }

  private buildRecoverForm() {
    this.recoverForm = this.FormBuilder.group({
      'password': new FormControl('', [Validators.required, ValidationService.passwordValidator]),
      'confirmPassword': new FormControl('', [Validators.required, ValidationService.passwordValidator]),
    }, {validator: ValidationService.passwordsEqualValidator});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
