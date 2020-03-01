import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { SnackBarService } from '../snackbar/snackbar.service';
import { ApiRoute } from '../utilities/api-route';
import { HttpErrorStatus } from '../utilities/enums';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private snackBarService: SnackBarService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(response: HttpErrorResponse) {
    if ([HttpErrorStatus.Unauthorized, HttpErrorStatus.Forbidden].indexOf(response.status) !== -1
      && [ApiRoute.Login, ApiRoute.Registration].indexOf(location.pathname.substring(1)) === -1) {
      this.snackBarService.close();
      this.authService.clearCredentials();
      this.router.navigate([ApiRoute.Default + ApiRoute.Login], { queryParams: { returnUrl: location.pathname }});
    } else {
      const errorMessage = (!!response && !!response.error) ? response.error.message : 'Server error';
      this.snackBarService.showError(errorMessage);
    }

    return throwError(response);
  }
}
