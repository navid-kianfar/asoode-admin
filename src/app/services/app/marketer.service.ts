import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { OperationResult } from '../../library/core/operation-result';

@Injectable({
  providedIn: 'root',
})
export class MarketerService {
  constructor(private readonly httpService: HttpService) {}

  async remove(id: any): Promise<OperationResult<boolean>> {
    return await this.httpService.post<boolean>(
      '/admin/marketers/remove/' + id,
    );
  }
  async toggle(id: any): Promise<OperationResult<boolean>> {
    return await this.httpService.post<boolean>(
      '/admin/marketers/toggle/' + id,
    );
  }
  async edit(id: any, model: any): Promise<OperationResult<boolean>> {
    return await this.httpService.post<boolean>(
      '/admin/marketers/edit/' + id,
      model,
    );
  }
  async create(model: any): Promise<OperationResult<boolean>> {
    return await this.httpService.post<boolean>(
      '/admin/marketers/create/',
      model,
    );
  }
}
