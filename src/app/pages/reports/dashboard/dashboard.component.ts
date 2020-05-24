import { Component, OnInit } from '@angular/core';
import { OperationResultStatus } from '../../../library/core/enums';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  waiting: boolean;

  constructor() {}

  ngOnInit() {}
}
