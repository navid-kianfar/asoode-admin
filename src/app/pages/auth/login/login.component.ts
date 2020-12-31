import { Component, OnInit } from '@angular/core';
import {FormViewModel} from '../../../components/core/form/contracts';
import {FormService} from '../../../services/core/form.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../../../services/auth/identity.service';
import { TranslateService } from '../../../services/core/translate.service';
import { environment } from '../../../../environments/environment';
import { OperationResultStatus } from '../../../library/core/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  waiting: boolean;
  form: FormViewModel[];
  googleOauth: string;
  mode: ViewMode;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formService: FormService,
    private readonly identityService: IdentityService,
    private readonly translateService: TranslateService,
    private readonly gaService: GoogleAnalyticsService,
  ) { }

  ngOnInit() {
    this.mode = ViewMode.Login;
    this.googleOauth = environment.googleOauth;

    const oauth = (this.activatedRoute.snapshot.queryParams as any).access;
    if (oauth) {
      const access = JSON.parse(atob(oauth));
      this.identityService.setIdentityInfo(access);
      this.mode = ViewMode.OAuth;
      this.identityService.load().then(() => {
        this.router.navigateByUrl('/dashboard');
      });
    }
    this.form = [
      {
        elements: [
          this.formService.createInput({
            config: { field: 'username', label: 'EMAIL_OR_PHONE' },
            params: { model: '', ltr: true },
            validation: {
              required: { value: true, message: 'EMAIL_OR_PHONE_REQUIRED' },
              minLength: { value: 10, message: 'EMAIL_OR_PHONE_MIN_LENGTH' },
              maxLength: { value: 50, message: 'EMAIL_OR_PHONE_MAX_LENGTH' },
            },
          }),
          this.formService.createInput({
            config: { field: 'password', label: 'PASSWORD' },
            params: { model: '', password: true, ltr: true },
            validation: {
              required: { value: true, message: 'PASSWORD_REQUIRED' },
              minLength: { value: 6, message: 'PASSWORD_MIN_LENGTH' },
              maxLength: { value: 50, message: 'PASSWORD_MAX_LENGTH' },
            },
          }),
          this.formService.createCaptcha(),
        ],
      },
    ];

    let userId = undefined;
    if (this.identityService.identity)  {
      userId = this.identityService.identity.userId
    }

    this.gaService.pageView(
      '/login',
      this.translateService.fromKey('LOGIN_TO_YOUR_ACCOUNT'),
      undefined,
      { user_id: userId },
    );
  }

  async login() {
    const model = this.formService.prepare(this.form);
    if (!model) {
      return;
    }
    this.waiting = true;
    const op = await this.identityService.login(model);
    if (op.status === OperationResultStatus.Success) {
      if (op.data.token) {
        await this.identityService.load();
        await this.router.navigateByUrl('/dashboard');
        return;
      }
      this.waiting = false;
      if (op.data.invalidPassword || op.data.notFound) {
        this.formService.setErrors(this.form, 'password', [
          'INVALID_USERNAME_PASSWORD',
        ]);
        return;
      }
      if (op.data.lockedOut) {
        this.formService.setErrors(this.form, 'username', [
          'ACCOUNT_LOCKED_OUT',
        ]);
        return;
      }
      return;
    }

    this.waiting = false;
  }
}

export enum ViewMode {
  Login = 1,
  OAuth = 3,
}
