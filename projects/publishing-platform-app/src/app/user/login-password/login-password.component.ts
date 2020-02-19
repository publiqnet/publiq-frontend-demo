import { Component, OnDestroy, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, UrlTree } from '@angular/router';

import { ReplaySubject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from '../../core/services/account.service';
import { ErrorEvent, ErrorService } from '../../core/services/error.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OauthService } from 'helper-lib';
import { isPlatformBrowser } from '@angular/common';
import { UtilService } from '../../core/services/util.service';
import { UiNotificationService } from '../../core/services/ui-notification.service';
import { TokenCheckStatus } from '../../core/services/models/enumes/TokenCheckStatus';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.scss']
})
export class LoginPasswordComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new ReplaySubject<void>(1);
  public configForm: FormGroup;
  public tokenCheckStatus = TokenCheckStatus.Init;
  public loginError: string = '';
  public encryptedBrainKey;
  public token;
  public stringToSign;
  public loadLoginForm = false;

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public accountService: AccountService,
    public oauthService: OauthService,
    private errorService: ErrorService,
    public notificationService: UiNotificationService,
    public translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }

  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e) => {
        if (e instanceof NavigationStart) {
          this.loadLoginForm = false;
        }
      });
    if (isPlatformBrowser(this.platformId)) {
      this.buildForm();
      this.activatedRoute.params
        .pipe(
          filter(params => params.code),
          switchMap(params => {
            this.token = params.code;
            return this.oauthService.signinCheckCode(params.code);
          }),
          takeUntil(this.unsubscribe$))
        .subscribe(result => {
          this.stringToSign = result.stringToSign;
          this.encryptedBrainKey = result.brainKey;
          this.accountService.brainKeyEncrypted = this.encryptedBrainKey;
          this.tokenCheckStatus = TokenCheckStatus.Success;
          this.loadLoginForm = true;
        }, error => {
          this.router.navigate([`/page-not-found`]);
        });

      this.errorService.errorEventEmiter
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: ErrorEvent) => {
            if (data.action === 'loadConfirm') {
              this.router.navigate([`/page-not-found`]);
            } else if (data.action === 'login' || data.action === 'authenticate') {
              this.loginError = this.errorService.getError('password_error');
            }
          }
        );

      this.configForm.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(newValues => this.loginError = '');
    }
  }

  get TokenCheckStatusEnum() {
    return TokenCheckStatus;
  }

  private buildForm() {
    this.configForm = this.formBuilder.group({
      password: new FormControl('', [
        Validators.required
      ])
    }
    );
  }

  onSubmit() {
    this.tokenCheckStatus = TokenCheckStatus.Loading;
    this.oauthService.signinGetToken(this.encryptedBrainKey, this.stringToSign, this.token, this.configForm.value.password)
      .pipe(
        switchMap((data: any) => this.accountService.accountAuthenticate(data.token)),
        takeUntil(this.unsubscribe$))
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
        this.tokenCheckStatus = TokenCheckStatus.Error;
        this.errorService.handleError('login', err);
      });
  }


  ngOnDestroy() {
    this.loadLoginForm = false;
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
