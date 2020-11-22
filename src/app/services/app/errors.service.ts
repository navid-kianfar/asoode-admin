import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { OperationResult } from '../../library/core/operation-result';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor(private readonly httpService: HttpService) {}

  async delete(id: any): Promise<OperationResult<boolean>> {
    return this.httpService.post<boolean>('/admin/errors/delete/' + id);
  }
}
