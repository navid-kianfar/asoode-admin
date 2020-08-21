import {
  AfterViewInit,
  Component,
  ElementRef, Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IdentityService } from '../../../services/auth/identity.service';
import { ModalService } from '../../../services/core/modal.service';
import { OperationResultStatus } from '../../../library/core/enums';
import { HttpService } from '../../../services/core/http.service';
import { OperationResult } from '../../../library/core/operation-result';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: any;
  loading: boolean;
  constructor(
    public readonly identityService: IdentityService,
    private readonly modalService: ModalService,
    private readonly httpService: HttpService,
  ) {}
  ngOnInit(): void {}
}
