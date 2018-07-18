import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';
import { AuthenticationService } from './authentication.service';
import { LoaderService } from '../loader/loader.service';
import { AppUserViewModel } from '../models/user/app-user-view.model';
import { RequestMethod } from '../utilities/enums';
import { ApiRoute } from '../utilities/api-route';
import { AppUserFilterRequest } from '../models/user/app-user-filter-request.model';

@Injectable()
export class AppUserService extends BaseService {

  constructor(
    protected httpClient: HttpClient,
    protected _authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient);
  }

  getAppUsers(appUserFilterRequest?: AppUserFilterRequest, isLoader = true): Observable<AppUserViewModel[]> {
    const searchParams = this.generateSearchParams(appUserFilterRequest);
    const headers = this._generateAuthHeaders();
    if (isLoader) {
      this._loaderService.show();
    }
    return this.sendRequest<AppUserViewModel[]>(RequestMethod.Get, ApiRoute.AppUsers, null, headers, searchParams)
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
