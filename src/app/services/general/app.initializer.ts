import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CultureService } from '../core/culture.service';
import { TranslateService } from '../core/translate.service';
import { IdentityService } from '../auth/identity.service';
import { EnumsService } from '../core/enums.service';
import { OperationResultStatus } from '../../library/core/enums';

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
  ) {
    this.loaded = false;
    this.profileLoaded = false;
  }

  async load() {
    const lang = this.cultureService.lang;
    const promise1 = this.refresh();
    const promise2 = this.translateService.load(lang);
    const promise3 = this.enumsService.load();
    return Promise.all([promise1, promise2, promise3]);
  }

  async refresh() {
    if (!this.identityService.identity.token) {
      return Promise.resolve();
    }

    const promise1 = this.identityService.load();

    promise1.then(op => {
      if (op.status === OperationResultStatus.NotFound) {
        this.identityService.logout();
        window.location.reload();
        return;
      }
    });

    return Promise.all([promise1]).then(() => {
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
