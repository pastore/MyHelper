import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizationTokenResponse } from '../models/auth/authorization-token-response.model';
import { LoginRequest } from '../models/auth/login-request.model';
import { RegistrationRequest } from '../models/auth/registration-request.model';
import { ApiRoute } from '../utilities/api-route';
import { RequestMethod } from '../utilities/enums';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';

@Injectable()
export class AccountService extends BaseService {
  constructor(
    protected httpClient: HttpClient,
    protected authService: AuthenticationService
  ) {
    super(httpClient, authService);
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.sendRequest<AuthorizationTokenResponse>(RequestMethod.Post, ApiRoute.Login, loginRequest, null, null)
      .pipe(map(response => {
        if (response) {
          this.authService.setCredentials(response);
          return true;
        }

        return false;
      }));
  }

  register(registrationRequest: RegistrationRequest): Observable<boolean> {
    return this.sendRequest<AuthorizationTokenResponse>(RequestMethod.Post, ApiRoute.Registration, registrationRequest, null, null)
      .pipe(map(response => {
        if (response) {
          this.authService.setCredentials(response);
          return true;
        }

        return false;
      }));
  }
}
