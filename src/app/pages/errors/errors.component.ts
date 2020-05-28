import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalService } from '../../services/core/modal.service';
import { ErrorsService } from '../../services/app/errors.service';
import { OperationResultStatus } from '../../library/core/enums';
import { GridCommand } from '../../view-models/core/grid-types';
import { OperationResult } from '../../library/core/operation-result';
import { ErrorModalComponent } from '../../modals/error/error-modal.component';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  commander: EventEmitter<GridCommand<any>>;
  constructor(
    private readonly modalService: ModalService,
    private readonly errorsService: ErrorsService,
  ) {}

  ngOnInit() {}

  prepareDelete(element: any) {
    this.modalService
      .confirm({ action: async () => OperationResult.Success(true) })
      .subscribe(async confirmed => {
        if (!confirmed) { return; }
        const op = await this.errorsService.delete(element.id);
        if (op.status === OperationResultStatus.Success) {
          this.commander.emit({reload: true});
        }
      });
  }

  open(element: any) {
    this.modalService.show(ErrorModalComponent, element).subscribe(() => {});
  }
}
