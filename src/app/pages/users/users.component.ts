import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormViewModel } from '../../components/core/form/contracts';
import { ModalService } from '../../services/core/modal.service';
import { FormService } from '../../services/core/form.service';
import { PromptComponent } from '../../modals/prompt/prompt.component';
import { OperationResultStatus, UserType } from '../../library/core/enums';
import { PlanService } from '../../services/app/plan.service';
import { UsersService } from '../../services/app/users.service';
import { GridCommand } from '../../view-models/core/grid-types';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { TranslateService } from '../../services/core/translate.service';
import { IdentityService } from '../../services/auth/identity.service';
import { CostUnit, PlanType } from '../../library/app/enums';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  commander = new EventEmitter<GridCommand<any>>();
  constructor(
    private readonly modalService: ModalService,
    private readonly formService: FormService,
    private readonly plansService: PlanService,
    private readonly usersService: UsersService,
    private readonly translateService: TranslateService,
    private readonly identityService: IdentityService,
    private readonly gaService: GoogleAnalyticsService,
  ) {}

  ngOnInit() {
    this.gaService.pageView(
      '/users',
      this.translateService.fromKey('USERS'),
      undefined,
      {
        user_id: this.identityService.identity.userId,
      },
    );
  }

  private createForm(plan): FormViewModel[] {

    return [
      {
        size: 6,
        elements: [
          this.formService.createInput({
            config: { field: 'title', label: 'TITLE' },
            params: { model: '' },
            validation: {
              required: {
                value: true,
                message: 'TITLE_REQUIRED',
              },
            },
          }),
          this.formService.createInput({
            config: { field: 'description', label: 'DESCRIPTION' },
            params: { model: '' },
            validation: {
              required: {
                value: true,
                message: 'DESCRIPTION_REQUIRED',
              },
            },
          }),
          this.formService.createInput({
            config: { field: 'picture', label: 'PICTURE' },
            params: { model: '' },
          }),
          this.formService.createDropDown({
            config: { field: 'type', label: 'TYPE' },
            params: { model: PlanType.Free, enum: 'PlanType', items: [] },
          }),
          this.formService.createDropDown({
            config: { field: 'unit', label: 'UNIT' },
            params: { model: CostUnit.Toman, enum: 'CostUnit', items: [] },
          }),
          this.formService.createNumber({
            config: { field: 'days', label: 'DAYS' },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: { field: 'planCost', label: 'AMOUNT' },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: { field: 'attachmentSize', label: 'ATTACHMENT_SIZE' },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: { field: 'space', label: 'DISK_SPACE' },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: { field: 'users', label: 'USERS' },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: { field: 'project', label: 'PROJECTS' },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: { field: 'workPackage', label: 'WORK_PACKAGES' },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: { field: 'simpleGroup', label: 'SIMPLE_GROUP' },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: { field: 'complexGroup', label: 'COMPLEX_GROUP' },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: {
              field: 'additionalWorkPackageCost',
              label: 'ADDITIONAL_WORK_PACKAGE_COST',
            },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: {
              field: 'additionalUserCost',
              label: 'ADDITIONAL_USER_COST',
            },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: {
              field: 'additionalSpaceCost',
              label: 'ADDITIONAL_SPACE_COST',
            },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: {
              field: 'additionalProjectCost',
              label: 'ADDITIONAL_PROJECT_COST',
            },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: {
              field: 'additionalSimpleGroupCost',
              label: 'ADDITIONAL_SIMPLE_GROUP_COST',
            },
            params: { model: 0 },
          }),
          this.formService.createNumber({
            config: {
              field: 'additionalComplexGroupCost',
              label: 'ADDITIONAL_COMPLEX_GROUP_COST',
            },
            params: { model: 0 },
          }),
        ],
      },
      {
        size: 6,
        elements: [
          this.formService.createCheckbox({
            config: { field: 'enabled' },
            params: { model: true, label: 'ENABLED' },
          }),
          this.formService.createCheckbox({
            config: { field: 'oneTime' },
            params: { model: true, label: 'ONE_TIME' },
          }),
          this.formService.createCheckbox({
            config: { field: 'canExtend' },
            params: { model: true, label: 'CAN_EXTEND' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureCustomField' },
            params: { model: true, label: 'FEATURE_CUSTOM_FIELD' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureTimeSpent' },
            params: { model: true, label: 'FEATURE_TIME_SPENT' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureTimeValue' },
            params: { model: true, label: 'FEATURE_TIME_VALUE' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureTimeOff' },
            params: { model: true, label: 'FEATURE_TIME_OFF' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureShift' },
            params: { model: true, label: 'FEATURE_SHIFT' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureReports' },
            params: { model: true, label: 'FEATURE_REPORTS' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featurePayments' },
            params: { model: true, label: 'FEATURE_PAYMENT' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureChat' },
            params: { model: true, label: 'FEATURE_CHAT' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureFiles' },
            params: { model: true, label: 'FEATURE_FILES' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureWbs' },
            params: { model: true, label: 'FEATURE_WBS' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureRoadMap' },
            params: { model: true, label: 'FEATURE_ROAD_MAP' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureTree' },
            params: { model: true, label: 'FEATURE_TREE' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureObjectives' },
            params: { model: true, label: 'FEATURE_OBJECTIVE' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureSeasons' },
            params: { model: true, label: 'FEATURE_SEASON' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureVote' },
            params: { model: true, label: 'FEATURE_VOTE' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureSubTask' },
            params: { model: true, label: 'FEATURE_SUB_TASK' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureKartabl' },
            params: { model: true, label: 'FEATURE_KARTABL' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureCalendar' },
            params: { model: true, label: 'FEATURE_CALENDAR' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureBlocking' },
            params: { model: true, label: 'FEATURE_BLOCKING' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureRelated' },
            params: { model: true, label: 'FEATURE_RELATED' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureComplexGroup' },
            params: { model: true, label: 'FEATURE_COMPLEX_GROUP' },
          }),
          this.formService.createCheckbox({
            config: { field: 'featureGroupTimeSpent' },
            params: { model: true, label: 'FEATURE_TIME_SPENT' },
          }),
        ],
      },
    ];
  }

  plan(element: any) {

    const form = this.createForm(element.plan);
    this.formService.setModel(form, element.plan);
    this.modalService
      .show(PromptComponent, {
        form,
        actionLabel: 'EDIT_PLAN',
        action: async (model, form) => {
          const op = await this.plansService.editUserPlan(element.id, model);
          if (op.status !== OperationResultStatus.Success) {
            // TODO: handle error
            return;
          }
          Object.assign(element.plan, model);
        },
        actionColor: 'primary',
        title: 'EDIT_PLAN',
      })
      .subscribe(() => {});
  }

  async toggleStatus(element: any) {
    this.modalService.confirm({
      title: 'USERS_TOGGLE_TITLE',
      message: 'USERS_TOGGLE_CONFIRM',
      action: async () => {
        const op = await this.usersService.toggle(element.id);
        if (op.status !== OperationResultStatus.Success) {
          // TODO: handle error
          return;
        }
        element.enabled = !element.enabled;
      },
    });
  }

  prepareReset(element: any) {
    this.modalService
      .show(PromptComponent, {
        form: [
          {
            elements: [
              this.formService.createInput({
                config: { field: 'password' },
                params: {
                  model: '',
                  password: true,
                  ltr: true,
                  placeHolder: 'PASSWORD',
                },
                validation: {
                  required: { value: true, message: 'PASSWORD_REQUIRED' },
                  minLength: { value: 6, message: 'PASSWORD_MIN_LENGTH' },
                  maxLength: { value: 50, message: 'PASSWORD_MAX_LENGTH' },
                },
              }),
              this.formService.createInput({
                config: { field: 'confirmPassword' },
                params: {
                  model: '',
                  password: true,
                  ltr: true,
                  placeHolder: 'CONFIRM_PASSWORD',
                },
                validation: {
                  required: {
                    value: true,
                    message: 'CONFIRM_PASSWORD_REQUIRED',
                  },
                  match: {
                    toField: 'password',
                    message: 'CONFIRM_PASSWORD_MISS_MATCH',
                  },
                },
              }),
            ],
          },
        ],
        actionLabel: 'RESET_PASSWORD',
        action: (model, form) =>
          this.usersService.resetPassword(element.id, model),
        actionColor: 'primary',
        title: 'RESET_PASSWORD',
      })
      .subscribe(() => {});
  }

  prepareEdit(element: any) {
    this.modalService
      .show(PromptComponent, {
        form: [
          {
            size: 6,
            elements: [
              this.formService.createInput({
                config: { field: 'firstName' },
                params: {
                  model: element.firstName,
                  placeHolder: 'FIRST_NAME',
                },
                validation: {
                  required: { value: true, message: 'FIRST_NAME_REQUIRED' },
                },
              }),
              this.formService.createInput({
                config: { field: 'lastName' },
                params: {
                  model: element.lastName,
                  placeHolder: 'LAST_NAME',
                },
                validation: {
                  required: { value: true, message: 'LAST_NAME_REQUIRED' },
                },
              }),
            ],
          },
          {
            size: 6,
            elements: [
              this.formService.createInput({
                config: { field: 'phone' },
                params: {
                  ltr: true,
                  model: element.phone,
                  placeHolder: 'PHONE',
                },
              }),
              this.formService.createInput({
                config: { field: 'email' },
                params: {
                  ltr: true,
                  model: element.email,
                  placeHolder: 'EMAIL',
                },
                validation: {
                  required: { value: true, message: 'EMAIL_REQUIRED' },
                },
              }),
            ],
          },
          {
            size: 6,
            elements: [
              this.formService.createDropDown({
                config: { field: 'type', label: 'USER_TYPE' },
                params: {
                  model: element.type,
                  items: [],
                  enum: 'UserType',
                  enumExcept: [UserType.Anonymous],
                },
              }),
            ],
          },
        ] as FormViewModel[],
        actionLabel: 'EDIT_USER',
        action: async (model, form) => {
          const op = await this.usersService.edit(element.id, model);
          if (op.status !== OperationResultStatus.Success) {
            // TODO: handle error
            return;
          }
          Object.assign(element, model);
        },
        actionColor: 'primary',
        title: 'EDIT_USER',
      })
      .subscribe(() => {});
  }

  loginAs(element: any) {}

  import(element: any) {}

  transactions(element: any) {}

  confirm(element: any) {
    this.modalService.confirm({
      title: 'USERS_CONFIRM_TITLE',
      message: 'USERS_CONFIRM_CONFIRM',
      action: async () => {
        const op = await this.usersService.confirm(element.id);
        if (op.status !== OperationResultStatus.Success) {
          // TODO: handle error
          return;
        }
        this.commander.emit({ reload: true });
      },
    });
  }

  block(element: any) {
    this.modalService.confirm({
      title: 'USERS_BLOCK_TITLE',
      message: 'USERS_BLOCK_CONFIRM',
      action: async () => {
        const op = await this.usersService.block(element.id);
        if (op.status !== OperationResultStatus.Success) {
          // TODO: handle error
          return;
        }
        this.commander.emit({ reload: true });
      },
    });
  }
}
