import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { OperationResult } from '../../library/core/operation-result';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private readonly httpService: HttpService) {}

  async create(model: any): Promise<OperationResult<boolean>> {
    return this.httpService.post<boolean>('/admin/blog/create', model);
  }
  async edit(id, model: any): Promise<OperationResult<boolean>> {
    return this.httpService.post<boolean>('/admin/blog/edit/' + id, model);
  }
  async deletePost(id): Promise<OperationResult<boolean>> {
    return this.httpService.post<boolean>(
      `/admin/blog/post/delete/${id}`
    );
  }
  async post(id, model: any): Promise<OperationResult<boolean>> {
    return this.httpService.formUpload<boolean>(
      `/admin/blog/${id}/post/create/`,
      model,
    );
  }
  async editPost(id, model: any): Promise<OperationResult<boolean>> {
    return this.httpService.formUpload<boolean>(
      `/admin/blog/post/edit/${id}`,
      model,
    );
  }
}
