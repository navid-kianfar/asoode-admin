import { Component, EventEmitter, OnInit } from '@angular/core';
import { GridCommand } from '../../view-models/core/grid-types';
import { ModalService } from '../../services/core/modal.service';
import { OperationResult } from '../../library/core/operation-result';
import { OperationResultStatus } from '../../library/core/enums';
import { DiscountsService } from '../../services/app/discounts.service';
import { PromptComponent } from '../../modals/prompt/prompt.component';
import { FormService } from '../../services/core/form.service';
import { BlogType, CostUnit } from '../../library/app/enums';
import { FormViewModel } from '../../components/core/form/contracts';
import { TranslateService } from '../../services/core/translate.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { IdentityService } from '../../services/auth/identity.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit {
  commander = new EventEmitter<GridCommand<any>>();
  constructor(
    private readonly modalService: ModalService,
    private readonly discountService: DiscountsService,
    private readonly formService: FormService,
    private readonly translateService: TranslateService,
    private readonly identityService: IdentityService,
    private readonly gaService: GoogleAnalyticsService,
  ) {}

  ngOnInit() {
    this.gaService.pageView(
      '/discounts',
      this.translateService.fromKey('DISCOUNTS'),
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
        const op = await this.discountService.delete(element.id);
        if (op.status === OperationResultStatus.Success) {
          this.commander.emit({ reload: true });
        }
      });
  }

  prepareEdit(element: any) {
    const form = this.createForm();
    this.formService.setModel(form, element);
    this.modalService
      .show(PromptComponent, {
        form,
        actionLabel: 'EDIT_DISCOUNT',
        action: async (model, form) => {
          const op = await this.discountService.edit(element.id, model);
          if (op.status !== OperationResultStatus.Success) {
            // TODO: handle error
            return;
          }
          this.commander.emit({ reload: true });
        },
        actionColor: 'primary',
        title: 'EDIT_DISCOUNT',
      })
      .subscribe(() => {});
  }

  prepareCreate() {
    this.modalService
      .show(PromptComponent, {
        form: this.createForm(),
        actionLabel: 'CREATE_DISCOUNT',
        action: async (model, form) => {
          const op = await this.discountService.create(model);
          if (op.status !== OperationResultStatus.Success) {
            // TODO: handle error
            return;
          }
          this.commander.emit({ reload: true });
        },
        actionColor: 'primary',
        title: 'CREATE_DISCOUNT',
      })
      .subscribe(() => {});
  }

  createForm(): FormViewModel[] {
    return [
      {
        size: 6,
        elements: [
          this.formService.createInput({
            config: { field: 'title' },
            params: {
              model: '',
              placeHolder: 'TITLE',
            },
          }),
          this.formService.createInput({
            config: { field: 'description' },
            params: {
              model: '',
              placeHolder: 'DESCRIPTION',
              textArea: true,
            },
          }),
          this.formService.createInput({
            config: { field: 'code' },
            params: {
              model: '',
              placeHolder: 'CODE',
            },
          }),
          this.formService.createDropDown({
            config: { field: 'costUnit' },
            params: {
              model: CostUnit.Toman,
              items: [],
              enum: 'CostUnit',
            },
          }),
          this.formService.createDropDown({
            config: { field: 'planId' },
            params: {
              model: undefined,
              items: [],
              backend: '/admin/plan/all',
              chooseLabel: 'FOR_PLAN',
            },
          }),
        ],
      },
      {
        size: 6,
        elements: [
          this.formService.createDatePicker({
            config: { field: 'startAt', label: 'START_AT' },
            params: {
              model: undefined,
            },
          }),
          this.formService.createDatePicker({
            config: { field: 'endAt', label: 'END_AT' },
            params: {
              model: undefined,
            },
          }),
          this.formService.createInput({
            config: { field: 'forUser' },
            params: {
              model: undefined,
              placeHolder: 'FOR_USER',
            },
          }),
          this.formService.createNumber({
            config: { field: 'maxUsage', label: 'MAX_USAGE' },
            params: {
              model: undefined,
            },
          }),
          this.formService.createNumber({
            config: { field: 'percent', label: 'PERCENT' },
            params: {
              model: undefined,
            },
          }),
          this.formService.createNumber({
            config: { field: 'maxUnit', label: 'MAX_UNIT' },
            params: {
              model: undefined,
            },
          }),
        ],
      },
    ] as FormViewModel[];
  }
}
