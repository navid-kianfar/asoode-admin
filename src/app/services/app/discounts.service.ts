import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { OperationResult } from '../../library/core/operation-result';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(private readonly httpService: HttpService) { }

  async delete(id: any): Promise<OperationResult<boolean>> {
    return this.httpService.post<boolean>('/admin/discounts/delete/' + id);
  }

  async create(model: any): Promise<OperationResult<boolean>> {
    return this.httpService.post<boolean>('/admin/discounts/create/', model);
  }

  async edit(id: any, model: any): Promise<OperationResult<boolean>> {
    return this.httpService.post<boolean>('/admin/discounts/edit/' + id, model);
  }
}
