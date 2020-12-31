import { Component } from '@angular/core';
import { AppInitializerProvider } from './services/general/app.initializer';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ios: boolean;
  constructor(
    readonly device: DeviceDetectorService,
    readonly appInitializerProvider: AppInitializerProvider,
  ) {
    this.ios = this.device.os.toLowerCase() === 'ios';
  }

  onActivate($event: any) {
    window.scrollTo(0, 0);
  }
}
