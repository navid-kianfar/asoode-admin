import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { OperationResult } from '../../library/core/operation-result';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async toggle(id: any): Promise<OperationResult<boolean>> {
    return await this.httpService.post<boolean>('/admin/user/toggle/' + id);
  }

  async resetPassword(id: any, model: any): Promise<OperationResult<boolean>> {
    return await this.httpService.post<boolean>(
      '/admin/user/reset-password/' + id,
      model,
    );
  }

  async edit(id: any, model: any): Promise<OperationResult<boolean>> {
    return await this.httpService.post<boolean>(
      '/admin/user/edit/' + id,
      model,
    );
  }
}
