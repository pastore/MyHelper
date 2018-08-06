import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { BaseService } from './base.service';
import { AuthenticationService } from './authentication.service';
import { ApiRoute } from '../utilities/api-route';
import { Observable } from 'rxjs/Observable';
import { RequestMethod } from '../utilities/enums';
import { LoaderService } from '../loader/loader.service';
import { FeedResponse } from '../models/feeds/feed-response.model';

@Injectable()
export class FeedService extends BaseService {

  constructor(
    protected httpClient: HttpClient,
    private _authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient);
  }

  getFeeds(isLoader = true): Observable<FeedResponse[]> {
    const headers = this._generateAuthHeaders();
    if (isLoader) {
      this._loaderService.show();
    }
    return this.sendRequest<FeedResponse[]>(RequestMethod.Get, ApiRoute.Feeds, null, headers, null)
    .finally(() => {
      if (isLoader) {
        this._loaderService.hide();
      }
    });
  }

  private _generateAuthHeaders(): HttpHeaders {
    const token = this._authService.currentUser ? this._authService.token : '';
    return new HttpHeaders({'Authorization': 'Bearer ' + token});
  }
}
