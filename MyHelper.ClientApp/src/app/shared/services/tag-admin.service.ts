import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IServerResponse } from '../models/base/server-response.model';
import { ApiRoute } from '../utilities/api-route';
import { AuthenticationService } from './authentication.service';
import { DataAPIService } from './data-api.service';
import { TagAdminModel } from '../models/tags/tag-admin.model';

@Injectable()
export class TagAdminService extends DataAPIService<TagAdminModel> {

  get tags(): Observable<TagAdminModel[]> {
    return this.data;
  }

  protected get apiUrl(): string {
    return ApiRoute.AdminTags;
  }

  constructor(
      protected httpClient: HttpClient,
      protected authService: AuthenticationService
    ) {
    super(httpClient, authService);
  }

  protected handleData(response: IServerResponse): TagAdminModel[] {
    return response.result as TagAdminModel[];
  }
}
