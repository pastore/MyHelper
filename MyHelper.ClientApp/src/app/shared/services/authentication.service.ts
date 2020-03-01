import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationTokenResponse } from '../models/auth/authorization-token-response.model';
import { AppUserViewModel } from '../models/user/app-user-view.model';

@Injectable()
export class AuthenticationService {
  private _jwtConfig = { tokenGetter: () => this.token ? this.token : null };
  private _jwtHelperService: JwtHelperService = new JwtHelperService(this._jwtConfig);

  get currentUser(): AppUserViewModel {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }

  get token(): string {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
  }

  isLoggedIn(): boolean {
    return this.token && !this._jwtHelperService.isTokenExpired(this.token);
  }

  clearCredentials() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  setCredentials(response: AuthorizationTokenResponse) {
    localStorage.setItem('currentUser', JSON.stringify(response.appUserViewModel));
    localStorage.setItem('token', JSON.stringify(response.token));
  }
}
