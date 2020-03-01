import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationRequest } from '../../shared/models/auth/registration-request.model';
import { AccountService } from '../../shared/services/account.servise';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SnackBarService } from '../../shared/snackbar/snackbar.service';
import { ApiRoute } from '../../shared/utilities/api-route';

@Component({
  selector: 'mh-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  model: RegistrationRequest = new RegistrationRequest();

  constructor(
    private _router: Router,
    private _accountService: AccountService,
    private _authService: AuthenticationService,
    private _snackBarService: SnackBarService
  ) {
    if (this._authService.isLoggedIn()) {
      this._router.navigate([ApiRoute.Default]);
    }
  }

  registration(registrationForm: FormGroup) {
    if (registrationForm.valid) {
      this._accountService.register(this.model)
        .subscribe(isSuccess => {
          if (isSuccess) {
            this._snackBarService.close();
            this._router.navigate([ApiRoute]);
          }
        });
    }
  }
}
