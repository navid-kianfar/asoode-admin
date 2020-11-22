import { Component, OnInit } from '@angular/core';
import { OperationResultStatus } from '../../../library/core/enums';
import { TranslateService } from '../../../services/core/translate.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { IdentityService } from '../../../services/auth/identity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  waiting: boolean;

  constructor(
    private readonly translateService: TranslateService,
    private readonly identityService: IdentityService,
    private readonly gaService: GoogleAnalyticsService,
  ) {}

  ngOnInit() {
    this.gaService.pageView(
      '/dashboard',
      this.translateService.fromKey('DASHBOARD'),
      undefined,
      {
        user_id: this.identityService.identity.userId,
      },
    );
  }
}
