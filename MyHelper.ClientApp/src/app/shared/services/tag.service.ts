import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IServerResponse } from '../models/base/server-response.model';
import { TagRequest } from '../models/tags/tag-request.model';
import { TagViewModel } from '../models/tags/tag-view.model';
import { ApiRoute } from '../utilities/api-route';
import { AuthenticationService } from './authentication.service';
import { DataAPIService } from './data-api.service';

@Injectable()
export class TagService extends DataAPIService<TagViewModel> {

  get tags(): Observable<TagViewModel[]> {
    return this.data;
  }

  protected get apiUrl(): string {
    return ApiRoute.Tags;
  }

  constructor(
      protected httpClient: HttpClient,
      protected authService: AuthenticationService
    ) {
    super(httpClient, authService);
  }

  createTag(tagRequest: TagRequest) {
    return this.post(tagRequest);
  }

  protected handleData(response: IServerResponse): TagViewModel[] {
    return response.result as TagViewModel[];
  }
}
