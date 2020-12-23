import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { FormViewModel } from '../../components/core/form/contracts';
import { FormService } from '../../services/core/form.service';
import { ContactService } from '../../services/app/contact.service';
import { OperationResultStatus } from '../../library/core/enums';
import { NotificationService } from '../../services/core/notification.service';

@Component({
  selector: 'app-contact-reply',
  templateUrl: './contact-reply.component.html',
  styleUrls: ['./contact-reply.component.scss']
})
export class ContactReplyComponent
  extends SimpleModalComponent<any, void>
  implements OnInit {
  id: string;
  message: string;
  email: string;
  firstName: string;
  lastName: string;
  waiting: boolean;
  replyWaiting: boolean;
  form: FormViewModel[];
  replies: any[];

  constructor(
    private readonly formService: FormService,
    private readonly contactService: ContactService,
    private readonly notificationService: NotificationService,
  ) { super(); }

  ngOnInit() {
    this.form = [
      {
        elements: [
          this.formService.createInput({
            config: { field: 'message', label: 'REPLY_MESSAGE' },
            params: { model: '', textArea: true },
            validation: {
              required: {
                value: true,
                message: 'MESSAGE_REQUIRED'
              }
            }
          })
        ]
      }
    ];
    this.fetch();
  }

  async fetch() {
    this.waiting = true;
    const op = await this.contactService.replies(this.id);
    this.replies = op.data || [];
    this.waiting = false;
  }

  async submit($event: any) {
    const model = this.formService.prepare(this.form);
    if (!model) { return; }
    this.replyWaiting = true;
    const op = await this.contactService.reply(this.id, model);
    this.replyWaiting = false;
    if (op.status === OperationResultStatus.Success) {
      this.replies.push(model);
      this.formService.reset(this.form);
      this.notificationService.success('GENERAL_SUCCESS');
    }
  }
}
