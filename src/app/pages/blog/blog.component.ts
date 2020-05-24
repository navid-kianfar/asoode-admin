import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalService } from '../../services/core/modal.service';
import { TranslateService } from '../../services/core/translate.service';
import { NotificationService } from '../../services/core/notification.service';
import { PromptComponent } from '../../modals/prompt/prompt.component';
import { OperationResultStatus } from '../../library/core/enums';
import { BlogService } from '../../services/app/blog.service';
import { GridCommand } from '../../view-models/core/grid-types';
import { FormService } from '../../services/core/form.service';
import { BlogType } from '../../library/app/enums';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  commander = new EventEmitter<GridCommand<any>>();

  constructor(
    private readonly modalService: ModalService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService,
    private readonly blogService: BlogService,
    private readonly formService: FormService,
    private readonly router: Router,
  ) {}

  ngOnInit() {}

  createForm() {
    return [
      {
        elements: [
          this.formService.createDropDown({
            config: { field: 'culture' },
            params: {
              model: 'fa',
              items: [
                { text: 'Persian', value: 'fa' },
                { text: 'English', value: 'en' },
                { text: 'Arabic', value: 'ar' },
              ],
            },
            validation: {
              required: { value: true, message: 'CULTURE_REQUIRED' },
            },
          }),
          this.formService.createDropDown({
            config: { field: 'type' },
            params: {
              model: BlogType.Post,
              items: [],
              enum: 'BlogType',
            },
            validation: {
              required: { value: true, message: 'CULTURE_REQUIRED' },
            },
          }),
          this.formService.createInput({
            config: { field: 'title' },
            params: {
              model: '',
              placeHolder: 'TITLE',
            },
            validation: {
              required: { value: true, message: 'TITLE_REQUIRED' },
            },
          }),
          this.formService.createInput({
            config: { field: 'description' },
            params: {
              model: '',
              placeHolder: 'DESCRIPTION',
              textArea: true,
            },
            validation: {
              required: { value: true, message: 'DESCRIPTION_REQUIRED' },
            },
          }),
          this.formService.createInput({
            config: { field: 'keywords' },
            params: {
              model: '',
              placeHolder: 'KEYWORDS',
              textArea: true,
            },
          }),
        ],
      },
    ];
  }

  create($event: void) {
    this.modalService
      .show(PromptComponent, {
        form: this.createForm(),
        actionLabel: 'CREATE_BLOG',
        action: async (model, form) => {
          const op = await this.blogService.create(model);
          if (op.status !== OperationResultStatus.Success) {
            // TODO: handle error
            return;
          }
          this.commander.emit({ reload: true });
        },
        actionColor: 'primary',
        title: 'CREATE_BLOG',
      })
      .subscribe(() => {});
  }

  prepareEdit(element: any) {
    const form = this.createForm();
    this.formService.setModel(form, element);
    this.modalService
      .show(PromptComponent, {
        form,
        actionLabel: 'EDIT_BLOG',
        action: async (model, form) => {
          const op = await this.blogService.edit(element.id, model);
          if (op.status !== OperationResultStatus.Success) {
            // TODO: handle error
            return;
          }
          this.commander.emit({ reload: true });
        },
        actionColor: 'primary',
        title: 'EDIT_BLOG',
      })
      .subscribe(() => {});
  }

  posts(element: any) {
    this.router.navigateByUrl('/posts/' + element.id);
  }
}
