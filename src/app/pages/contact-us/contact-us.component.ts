import { Component, EventEmitter, OnInit } from '@angular/core';
import { GridCommand } from '../../view-models/core/grid-types';
import { ModalService } from '../../services/core/modal.service';
import { ErrorsService } from '../../services/app/errors.service';
import { TranslateService } from '../../services/core/translate.service';
import { IdentityService } from '../../services/auth/identity.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { OperationResult } from '../../library/core/operation-result';
import { OperationResultStatus } from '../../library/core/enums';
import { ErrorModalComponent } from '../../modals/error/error-modal.component';
import { ContactService } from '../../services/app/contact.service';
import { ContactReplyComponent } from '../../modals/contact-reply/contact-reply.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  commander = new EventEmitter<GridCommand<any>>();
  constructor(
    private readonly modalService: ModalService,
    private readonly translateService: TranslateService,
    private readonly identityService: IdentityService,
    private readonly contactService: ContactService,
    private readonly gaService: GoogleAnalyticsService,
  ) {}

  ngOnInit() {
    this.gaService.pageView(
      '/contact',
      this.translateService.fromKey('CONTACT_US'),
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
        const op = await this.contactService.delete(element.id);
        if (op.status === OperationResultStatus.Success) {
          this.commander.emit({ reload: true });
        }
      });
  }

  open(element: any) {
    this.modalService.show(ContactReplyComponent, element).subscribe(() => {});
  }
}
