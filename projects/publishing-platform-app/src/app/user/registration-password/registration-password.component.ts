import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, UrlTree } from '@angular/router';

import { ReplaySubject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from '../../core/services/account.service';
import { ErrorEvent, ErrorService } from '../../core/services/error.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../core/validator/validator.service';
import { OauthService } from 'helper-lib';
import { UtilService } from '../../core/services/util.service';
import { isPlatformBrowser } from '@angular/common';
import { CryptService } from '../../core/services/crypt.service';
import { TokenCheckStatus } from '../../core/services/models/enumes/TokenCheckStatus';

@Component({
  selector: 'app-registration-password',
  templateUrl: './registration-password.component.html',
  styleUrls: ['./registration-password.component.scss']
})
export class RegistrationPasswordComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new ReplaySubject<void>(1);
  public configForm: FormGroup;
  public tokenCheckStatus = TokenCheckStatus.Init;
  public registerError: string = '';
  public token;
  public stringToSign;
  showPhase: boolean = false;
  loginAccount: boolean = true;
  public decryptedBrainKey: string;
  passwordVerified = false;
  isDataLoaded: boolean = false;

  public passwordError = {
    length: null,
    uppercase: null,
    lowercase: null,
    number: null,
    matching: null
  };

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public accountService: AccountService,
    public oauthService: OauthService,
    private errorService: ErrorService,
    public translateService: TranslateService,
    public cryptService: CryptService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }

  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e) => {
        if (e instanceof NavigationStart) {
          this.isDataLoaded = false;
        }
      });

    this.buildForm();
    this.activatedRoute.params
      .pipe(
        filter(params => params.code),
        switchMap(params => {
          this.token = params.code;
          return this.oauthService.signupConfirmation(params.code);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(result => {
        this.stringToSign = result.stringToSign;
        this.tokenCheckStatus = TokenCheckStatus.Success;
      }, error => {
        this.router.navigate([`/page-not-found`]);
      });

    this.errorService.errorEventEmiter
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: ErrorEvent) => {
        if (data.action === 'loadConfirm') {
          this.router.navigate([`/page-not-found`]);
        } else if (data.action === 'register') {
          this.registerError = this.errorService.getError('system_error');
        }
      });

    this.configForm.valueChanges.subscribe(newValues => this.registerError = '');
    if (isPlatformBrowser(this.platformId)) { this.isDataLoaded = true; }
  }

  get TokenCheckStatusEnum() {
    return TokenCheckStatus;
  }

  private buildForm() {
    this.configForm = this.formBuilder.group({
        password: new FormControl('', [
          Validators.required,
          ValidationService.passwordValidator
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          ValidationService.passwordValidator
        ])
      },
      {validator: ValidationService.passwordsEqualValidator}
    );

    this.configForm.valueChanges.subscribe(this.passwordValidation.bind(this));
  }

  passwordValidation(form) {
    this.passwordError.length = form.password.length < 8;
    this.passwordError.number = !form.password.match(/\d/);
    this.passwordError.uppercase = !form.password.match(/[A-Z]/);
    this.passwordError.lowercase = !form.password.match(/[a-z]/);
    this.passwordError.matching = form.password !== '' && form.password !== form.confirmPassword || null;
  }

  onSubmit() {
    // this.tokenCheckStatus = TokenCheckStatus.Loading;
    this.oauthService.signupComplete(this.stringToSign, this.token, this.configForm.value.password)
      .pipe(
        switchMap((data: any) => {
          this.accountService.brainKeyEncrypted = data.brainKey;
          if (this.cryptService.checkPassword(data.brainKey, this.configForm.value.password)) {
            this.decryptedBrainKey = this.cryptService.getDecryptedBrainKey(data.brainKey, this.configForm.value.password);
          } else {
            this.loginAccount = false;
          }
          this.showPhase = true;
          this.oauthService.generateRandomKey();
          return this.accountService.accountAuthenticate(data.token);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(data => {
        if (isPlatformBrowser(this.platformId) && UtilService.getCookie('redirectUrl')) {
          const redirectUrl = UtilService.getCookie('redirectUrl');
          const urlTree: UrlTree = this.router.parseUrl(redirectUrl);
          this.router.navigateByUrl(urlTree);
          UtilService.removeCookie('redirectUrl');
        }
      }, (err) => {
        this.tokenCheckStatus = TokenCheckStatus.Error;
        this.errorService.handleError('register', err);
      });
  }

  doneRegistration() {
    this.loginAccount = true;
    this.accountService.startEarningPopupShown = true;
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
