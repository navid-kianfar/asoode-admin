import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { OperationResult } from '../../library/core/operation-result';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private readonly httpService: HttpService) {}

  async delete(id: any): Promise<OperationResult<boolean>> {
    return this.httpService.post<boolean>('/admin/contact/delete/' + id);
  }

  async replies(id: string): Promise<OperationResult<any>> {
    return this.httpService.post<boolean>('/admin/contact/replies/' + id);
  }

  async reply(id: string, model: any): Promise<OperationResult<boolean>> {
    return this.httpService.post<boolean>('/admin/contact/reply/' + id, model);
  }
}
