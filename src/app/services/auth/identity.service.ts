import { Injectable } from '@angular/core';
import {
  IdentityObject,
  ProfileViewModel,
} from '../../view-models/auth/identity-types';
import { HttpService } from '../core/http.service';
import { OperationResult } from '../../library/core/operation-result';
import { OperationResultStatus } from '../../library/core/enums';
import {
  LoginResultViewModel,
} from '../../view-models/auth/identity-view-models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  private readonly STORAGE_KEY = 'ASOODE_IDENTITY';
  private identityObject: IdentityObject;
  private profileObject: ProfileViewModel = {} as ProfileViewModel;

  constructor(
    private readonly httpService: HttpService,
    private readonly cookieService: CookieService,
  ) {
    this.identityObject = this.getIdentityInfo();
    // this.cookieService.deleteAll();
  }

  get profile(): ProfileViewModel {
    return this.profileObject;
  }

  private getIdentityInfo(): IdentityObject {
    if (localStorage) {
      const identityJson = localStorage.getItem(this.STORAGE_KEY);
      if (identityJson) {
        return JSON.parse(identityJson) as IdentityObject;
      }
    }
    return { token: null, username: null, userId: null };
  }

  setIdentityInfo(identity: IdentityObject) {
    this.identityObject = identity;
    if (localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(identity));
    }
  }

  private removeIdentityInfo() {
    if (localStorage) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.identityObject = { token: null, username: null, userId: null };
  }

  get identity(): IdentityObject {
    return this.identityObject;
  }

  logout() {
    this.removeIdentityInfo();
  }

  async login(model: any): Promise<OperationResult<LoginResultViewModel>> {
    const op = await this.httpService.post<LoginResultViewModel>(
      '/account/login',
      model,
    );
    if (op.status === OperationResultStatus.Success) {
      this.setIdentityInfo({
        userId: op.data.userId,
        token: op.data.token,
        username: op.data.username,
      });
    }
    return op;
  }

  async load(): Promise<OperationResult<any>> {
    const op = await this.httpService.post<any>('/account/profile');
    if (op.status === OperationResultStatus.Success) {
      this.profileObject = op.data;
    }
    return op;
  }
}
