import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { AdminTableFilterRequest } from '../models/base/admin-table-filter-request.model';
import { IPageResult } from '../models/base/i-page-result.model';
import { AppUserViewModel } from '../models/user/app-user-view.model';
import { ApiRoute } from '../utilities/api-route';
import { RequestMethod } from '../utilities/enums';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';

@Injectable()
export class AppUserService extends BaseService {

  constructor(
    protected httpClient: HttpClient,
    protected authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient, authService);
  }

  getUsersByPage(adminTableFilterRequest: AdminTableFilterRequest): Observable<IPageResult<AppUserViewModel>> {
    const searchParams = this.generateSearchParams(adminTableFilterRequest);
    const headers = this.generateAuthHeaders();
    return this.sendRequest<IPageResult<AppUserViewModel>>(
      RequestMethod.Get, ApiRoute.AppUsers + '/' + ApiRoute.Admin, null, headers, searchParams);
  }
}
