import { Injectable } from '@angular/core';
import { IdentityService } from '../auth/identity.service';
import { Router } from '@angular/router';
import { WindowService } from './window.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  constructor(
    private readonly identityService: IdentityService,
    private readonly router: Router,
    private readonly windowService: WindowService,
    readonly detector: DeviceDetectorService
  ) {}

  handleSocket(notification: any) {
    // console.log('socket', notification);
  }

  handlePush(notification: any) {
    // console.log('push', notification);
  }

  handlePushClick(notification: any) {
    // console.log('click', notification);
  }
}
