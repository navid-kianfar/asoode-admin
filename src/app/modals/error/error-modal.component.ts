import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent
  extends SimpleModalComponent<{
    errorBody: string;
    description: string;
  }, void>
  implements OnInit {
  errorBody: string;
  description: string;
  constructor() { super(); }

  ngOnInit() {
  }

}
