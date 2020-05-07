import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { OperationResult } from '../../library/core/operation-result';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private readonly httpService: HttpService) { }

  async toggle(id: any): Promise<OperationResult<boolean>> {
    return await this.httpService.post<boolean>(
      '/admin/plan/toggle/' + id,
    );
  }
  async edit(id: any, model: any): Promise<OperationResult<boolean>> {
    return await this.httpService.post<boolean>(
      '/admin/plan/edit/' + id, model
    );
  }
  async create(model: any): Promise<OperationResult<boolean>> {
    return await this.httpService.post<boolean>(
      '/admin/plan/create/', model
    );
  }

  async editUserPlan(id: any, model: any) {
    return await this.httpService.post<boolean>(
      '/admin/plan/user/' + id, model
    );
  }
}
