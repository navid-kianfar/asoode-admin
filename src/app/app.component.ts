import { Component } from '@angular/core';
import { AppInitializerProvider } from './services/general/app.initializer';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Socket } from 'ngx-socket-io';
import { ModalService } from './services/core/modal.service';
import { IdentityService } from './services/auth/identity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly device: DeviceDetectorService,
    private readonly modalService: ModalService,
    private readonly identityService: IdentityService,
    readonly appInitializerProvider: AppInitializerProvider,
  ) {
    const loader = document.getElementById('app-loading-container');
    document.body.removeChild(loader);
    document.body.className = `${document.body.className} ${this.device.os} ${this.device.browser}`.toLowerCase();
  }

  logout() {
    this.modalService
      .confirm({
        action: async () => {
          this.identityService.logout();
          setTimeout(() => (window.location.href = '/'), 1000);
        },
      })
      .subscribe(() => {});
  }
}
