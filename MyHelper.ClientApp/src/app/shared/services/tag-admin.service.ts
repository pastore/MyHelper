import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagAdminModel } from '../models/tags/tag-admin.model';
import { TagRequest } from '../models/tags/tag-request.model';
import { ApiRoute } from '../utilities/api-route';
import { RequestMethod } from '../utilities/enums';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';
import { AdminTableFilterRequest } from '../models/base/admin-table-filter-request.model';
import { IPageResult } from '../models/base/i-page-result.model';

@Injectable()
export class TagAdminService extends BaseService {
  constructor(
      protected httpClient: HttpClient,
      protected authService: AuthenticationService
    ) {
    super(httpClient, authService);
  }

  getTagsByPage(adminTableFilterRequest: AdminTableFilterRequest): Observable<IPageResult<TagAdminModel>> {
    const searchParams = this.generateSearchParams(adminTableFilterRequest);
    const headers = this.generateAuthHeaders();
    return this.sendRequest<IPageResult<TagAdminModel>>(
      RequestMethod.Get, ApiRoute.Tags + '/' + ApiRoute.Admin, null, headers, searchParams);
  }

  updateTag(tagRequest: TagRequest) {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Put, ApiRoute.Tags, tagRequest, headers);
  }

  deleteTag(id: number): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.Tags + '/' + id, null, headers);
  }
}

