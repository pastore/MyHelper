import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { FeedFilterRequest } from '../models/feeds/feed-filter-request.model';
import { FeedResponse } from '../models/feeds/feed-response.model';
import { ApiRoute } from '../utilities/api-route';
import { RequestMethod } from '../utilities/enums';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';

@Injectable()
export class FeedService extends BaseService {

  constructor(
    protected httpClient: HttpClient,
    protected authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient, authService);
  }

  getFeeds(feedFilterRequest: FeedFilterRequest, isLoader = true): Observable<FeedResponse[]> {
    const searchParams = this.generateSearchParams(feedFilterRequest);
    const headers = this.generateAuthHeaders();
    if (isLoader) {
      this._loaderService.show();
    }
    return this.sendRequest<FeedResponse[]>(RequestMethod.Get, ApiRoute.Feeds, null, headers, searchParams)
    .pipe(finalize(() => {
      if (isLoader) {
        this._loaderService.hide();
      }
    }));
  }
}
