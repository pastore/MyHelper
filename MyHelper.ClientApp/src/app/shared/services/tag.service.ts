import { Injectable } from '@angular/core';
import { TagViewModel } from '../models/tags/tag-view.model';
import { DataAPIService } from './data-api.service';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { ApiRoute } from '../app-settings/api-route';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { TagRequest } from '../models/tags/tag-request-model';
import { IServerResponse } from '../models/base/server-response.model';

@Injectable()
export class TagService extends DataAPIService<TagViewModel> {

  get tags(): Observable<TagViewModel[]> {
    return this.data;
  }

  protected get apiUrl(): string {
    return ApiRoute.Tags;
  }

  constructor(protected httpClient: HttpClient,
    protected authService: AuthenticationService) {
    super(httpClient, authService);
  }

  createTag(tagRequest: TagRequest) {
    return this.post(tagRequest);
  }

  protected handleData(response: IServerResponse): TagViewModel[] {
    const body = response;

    let tags: TagViewModel[];
    if (body.isSuccess) {
      tags = body.result;
    }

    return tags;
  }
}
