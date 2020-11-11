import { Component, EventEmitter, OnInit } from '@angular/core';
import { GridCommand } from '../../view-models/core/grid-types';
import { ModalService } from '../../services/core/modal.service';
import { TranslateService } from '../../services/core/translate.service';
import { NotificationService } from '../../services/core/notification.service';
import { BlogService } from '../../services/app/blog.service';
import { FormService } from '../../services/core/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogType } from '../../library/app/enums';
import { PromptComponent } from '../../modals/prompt/prompt.component';
import { OperationResultStatus } from '../../library/core/enums';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  id: string;
  commander = new EventEmitter<GridCommand<any>>();

  constructor(
    private readonly modalService: ModalService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService,
    private readonly blogService: BlogService,
    private readonly formService: FormService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  createForm() {
    return [
      {
        elements: [
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
          this.formService.createInput({
            config: { field: 'summary' },
            params: {
              model: '',
              placeHolder: 'SUMMARY',
              textArea: true,
            },
          }),
          this.formService.createEditor({
            config: { field: 'text' },
            params: {
              model: '',
              placeHolder: 'TEXT',
            },
            validation: {
              required: { value: true, message: 'TEXT_REQUIRED' },
            },
          }),
          this.formService.createFilePicker({
            config: { field: 'thumbImage' },
            params: {
              placeHolder: 'THUMB_IMAGE',
            },
          }),
          this.formService.createFilePicker({
            config: { field: 'mediumImage' },
            params: {
              placeHolder: 'MEDIUM_IMAGE',
            },
          }),
          this.formService.createFilePicker({
            config: { field: 'largeImage' },
            params: {
              placeHolder: 'LARGE_IMAGE',
            },
          }),
          this.formService.createNumber({
            config: { field: 'priority', label: 'PRIORITY' },
            params: { model: 0 }
          })
        ],
      },
    ];
  }

  create($event: void) {
    this.modalService
      .show(PromptComponent, {
        form: this.createForm(),
        actionLabel: 'CREATE_POST',
        action: async (model, form) => {
          const op = await this.blogService.post(this.id, model);
          if (op.status !== OperationResultStatus.Success) {
            // TODO: handle error
            return;
          }
          this.commander.emit({ reload: true });
        },
        actionColor: 'primary',
        title: 'CREATE_POST',
      })
      .subscribe(() => {});
  }

  prepareEdit(element: any) {
    const form = this.createForm();
    this.formService.setModel(form, element);
    this.modalService
      .show(PromptComponent, {
        form,
        actionLabel: 'EDIT_POST',
        action: async (model, form) => {
          const op = await this.blogService.editPost(element.id, model);
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

  prepareDelete(element: any) {}
}
