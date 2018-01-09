import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestMethod } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrentUser } from '../models/user/current-user.model';
import { LoginRequest } from '../models/auth/login-request.model';
import { Observable } from 'rxjs/Observable';
import '../utilities/rxjs-operators';
import { ApiRoute } from '../app-settings/api-route';
import { RegistrationRequest } from '../models/auth/registration-request.model';
import { AuthorizationTokenResponse } from '../models/auth/authorizationTokenResponse.model';
import { BaseService } from './base.service';
import { IServerResponse } from '../models/base/server-response.model';

@Injectable()
export class AuthenticationService extends BaseService {

  private _jwtConfig = { tokenGetter: () => this.currentUser && this.currentUser.token ? this.currentUser.token : null };
  private _jwtHelperService: JwtHelperService = new JwtHelperService(this._jwtConfig);

  get currentUser(): CurrentUser {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }

  constructor(private http: Http) {
    super(http);
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.sendRequest(RequestMethod.Post, ApiRoute.Login, loginRequest, null, this._handleResponse);
  }

  logout(): void {
      localStorage.removeItem('currentUser');
  }

  createUser(registrationRequest: RegistrationRequest): Observable<boolean> {
    return this.sendRequest(RequestMethod.Post, ApiRoute.Registration, registrationRequest, null, this._handleResponse);
  }

  isLoggedIn(): boolean {
      return this.currentUser && this.currentUser.token && !this._jwtHelperService.isTokenExpired(this.currentUser.token);
  }

  private _handleResponse(response: IServerResponse): boolean {
    if (response.isSuccess && response.result) {
      const currentUser = this._mapToCurrentUser(response.result);

      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    } else {
        return false;
    }
  }

  private _mapToCurrentUser(result: AuthorizationTokenResponse): CurrentUser {
    return new CurrentUser(
      result.appUserViewModel.id,
      result.appUserViewModel.userName,
      result.appUserViewModel.email,
      result.appUserViewModel.role,
      result.appUserViewModel.avatar,
      result.appUserViewModel.createdDate,
      result.token
    );
  }
}
