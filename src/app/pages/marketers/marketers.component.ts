import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalService } from '../../services/core/modal.service';
import { TranslateService } from '../../services/core/translate.service';
import { FormService } from '../../services/core/form.service';
import { FormViewModel } from '../../components/core/form/contracts';
import { CostUnit, PlanType } from '../../library/app/enums';
import { OperationResultStatus } from '../../library/core/enums';
import { PromptComponent } from '../../modals/prompt/prompt.component';
import { MarketerService } from '../../services/app/marketer.service';
import { GridCommand } from '../../view-models/core/grid-types';
import { OperationResult } from '../../library/core/operation-result';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { IdentityService } from '../../services/auth/identity.service';

@Component({
  selector: 'app-marketers',
  templateUrl: './marketers.component.html',
  styleUrls: ['./marketers.component.scss'],
})
export class MarketersComponent implements OnInit {
  commander = new EventEmitter<GridCommand<any>>();
  constructor(
    private readonly translateService: TranslateService,
    private readonly gaService: GoogleAnalyticsService,
    private readonly modalService: ModalService,
    private readonly formService: FormService,
    private readonly identityService: IdentityService,
    private readonly marketerService: MarketerService,
  ) {}

  ngOnInit() {
    this.gaService.pageView('/marketers', this.translateService.fromKey('MARKETERS'), undefined, {
      user_id: this.identityService.identity.userId
    });
  }

  private createForm(): FormViewModel[] {
    return [
      {
        elements: [
          this.formService.createInput({
            config: { field: 'title', label: 'TITLE' },
            params: { model: '' },
            validation: {
              required: {
                value: true,
                message: 'TITLE_REQUIRED'
              }
            }
          }),
          this.formService.createInput({
            config: { field: 'description', label: 'DESCRIPTION' },
            params: { model: '', textArea: true },
            validation: {
              required: {
                value: true,
                message: 'DESCRIPTION_REQUIRED'
              }
            }
          }),
          this.formService.createInput({
            config: { field: 'code', label: 'CODE' },
            params: { model: '' },
            validation: {
              required: {
                value: true,
                message: 'CODE_REQUIRED'
              }
            }
          }),
          this.formService.createInput({
            config: { field: 'fixed', label: 'FIXED' },
            params: { model: '', numeric: true }
          }),
          this.formService.createNumber({
            config: { field: 'percent', label: 'PERCENT' },
            params: { model: 0 }
          }),
        ]
      }
    ];
  }


  prepareDelete(element: any) {
    this.modalService
      .confirm({ action: async () => OperationResult.Success(true) })
      .subscribe(async confirmed => {
        if (!confirmed) { return; }
        const op = await this.marketerService.remove(element.id);
        if (op.status === OperationResultStatus.Success) {
          this.commander.emit({reload: true});
        }
      });
  }

  async toggleStatus(element: any) {
    const op = await this.marketerService.toggle(element.id);
    if (op.status !== OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    element.enabled = !element.enabled;
  }

  prepareEdit(element: any) {
    const form = this.createForm();
    this.formService.setModel(form, element);
    this.modalService
      .show(PromptComponent, {
        form,
        actionLabel: 'EDIT_MARKETER',
        action: async (model, form) => {
          const op = await this.marketerService.edit(element.id, model);
          if (op.status !== OperationResultStatus.Success) {
            // TODO: handle error
            return;
          }
          Object.assign(element, model);
        },
        actionColor: 'primary',
        title: 'EDIT_MARKETER',
      })
      .subscribe(() => {});
  }

  prepareCreate() {
    this.modalService
      .show(PromptComponent, {
        form: this.createForm(),
        actionLabel: 'CREATE_MARKETER',
        action: async (model, form) => {
          const op = await this.marketerService.create(model);
          if (op.status !== OperationResultStatus.Success) {
            // TODO: handle error
            return;
          }
          this.commander.emit({ reload: true });
        },
        actionColor: 'primary',
        title: 'CREATE_MARKETER',
      })
      .subscribe(() => {});
  }
}
