import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiRoute } from '../utilities/api-route';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.isLoggedIn()) {
      if (route.data.roles && route.data.roles.indexOf(this._authService.currentUser.userRole) === -1) {
        this._router.navigate([ApiRoute.Default]);
        return false;
      }

      return true;
    }

    this._router.navigate([ApiRoute.Default + ApiRoute.Login], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
