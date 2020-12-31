import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CultureService } from '../core/culture.service';
import { TranslateService } from '../core/translate.service';
import { IdentityService } from '../auth/identity.service';
import { EnumsService } from '../core/enums.service';
import { OperationResultStatus } from '../../library/core/enums';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable()
export class AppInitializerProvider {
  loaded: boolean;
  profileLoaded: boolean;

  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService,
    private readonly identityService: IdentityService,
    private readonly cultureService: CultureService,
    private readonly enumsService: EnumsService,
    public readonly swUpdate: SwUpdate
  ) {
    this.loaded = false;
    this.profileLoaded = false;
    this.bind();
  }

  bind() {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    // check every 10 minutes for update
    interval(1000 * 60 * 10).subscribe(() =>
      this.swUpdate
        .checkForUpdate()
        .then(() => console.log('checking for updates...'))
    );
    this.swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      this.swUpdate.activateUpdate().then(() => {
        document.location.reload();
        console.log('The app is updating right now');
      });
    });
    this.swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA Application');
      // this.identityService.install();
    }
    window.addEventListener('appinstalled', evt => {
      console.log('PWA Application installed');
      // this.identityService.install();
    });
  }

  async load() {
    await this.refresh();
    const loader = document.getElementById('app-loading-container');
    if (loader) { document.body.removeChild(loader); }
  }

  async refresh() {

    const promise1 = this.identityService.identity.token ?
      this.identityService.load() :
      Promise.resolve();

    const promise2 = this.translateService.load(this.cultureService.lang);
    const promise3 = this.enumsService.load();
    return Promise.all([promise1, promise2, promise3]).then(() => {
      this.profileLoaded = true;
      return Promise.resolve();
    });
  }
}

export function AppInitializerFactory(provider: AppInitializerProvider) {
  return () => {
    provider.load().then(() => {
      provider.loaded = true;
    });
  };
}
