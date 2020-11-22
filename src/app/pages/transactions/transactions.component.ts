import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../services/core/translate.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { IdentityService } from '../../services/auth/identity.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  constructor(
    private readonly translateService: TranslateService,
    private readonly identityService: IdentityService,
    private readonly gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.gaService.pageView('/transactions', this.translateService.fromKey('TRANSACTIONS'), undefined, {
      user_id: this.identityService.identity.userId
    });
  }
}
