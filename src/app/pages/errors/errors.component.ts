import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalService } from '../../services/core/modal.service';
import { ErrorsService } from '../../services/app/errors.service';
import { OperationResultStatus } from '../../library/core/enums';
import { GridCommand } from '../../view-models/core/grid-types';
import { OperationResult } from '../../library/core/operation-result';
import { ErrorModalComponent } from '../../modals/error/error-modal.component';
import { TranslateService } from '../../services/core/translate.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { IdentityService } from '../../services/auth/identity.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  commander = new EventEmitter<GridCommand<any>>();
  constructor(
    private readonly modalService: ModalService,
    private readonly errorsService: ErrorsService,
    private readonly translateService: TranslateService,
    private readonly identityService: IdentityService,
    private readonly gaService: GoogleAnalyticsService,
  ) {}

  ngOnInit() {
    this.gaService.pageView(
      '/errors',
      this.translateService.fromKey('ERRORS'),
      undefined,
      {
        user_id: this.identityService.identity.userId,
      },
    );
  }

  prepareDelete(element: any) {
    this.modalService
      .confirm({ action: async () => OperationResult.Success(true) })
      .subscribe(async confirmed => {
        if (!confirmed) {
          return;
        }
        const op = await this.errorsService.delete(element.id);
        if (op.status === OperationResultStatus.Success) {
          this.commander.emit({ reload: true });
        }
      });
  }

  open(element: any) {
    this.modalService.show(ErrorModalComponent, element).subscribe(() => {});
  }
}
