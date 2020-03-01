import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from '../../shared/models/auth/login-request.model';
import { AccountService } from '../../shared/services/account.servise';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SnackBarService } from '../../shared/snackbar/snackbar.service';
import { ApiRoute } from '../../shared/utilities/api-route';

@Component({
  selector: 'mh-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: LoginRequest = new LoginRequest();
  returnUrl: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _accountService: AccountService,
    private _authService: AuthenticationService,
    private _snackBarService: SnackBarService
  ) {
    if (this._authService.isLoggedIn()) {
      this._router.navigate([ApiRoute.Default]);
    }
  }

  ngOnInit() {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || ApiRoute.Default;
  }

  login(loginForm: FormGroup) {
    if (loginForm.valid) {
      this._accountService.login(this.model)
        .subscribe(isSuccess => {
          if (isSuccess) {
            this._snackBarService.close();
            this._router.navigate([this.returnUrl]);
          }
        });
    }
  }
}
