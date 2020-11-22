import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../services/core/translate.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { IdentityService } from '../../services/auth/identity.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss'],
})
export class CmsComponent implements OnInit {
  constructor(
    private readonly translateService: TranslateService,
    private readonly identityService: IdentityService,
    private readonly gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.gaService.pageView('/cms', this.translateService.fromKey('CMS'), undefined, {
      user_id: this.identityService.identity.userId
    });
  }
}
