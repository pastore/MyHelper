import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../shared/models/auth/login-request.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SnackBarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'mh-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  model: LoginRequest = new LoginRequest();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private snackBarService: SnackBarService) { }

  login(loginForm: FormGroup) {
      if (loginForm.valid) {
          this.authService.login(this.model)
            .subscribe(success => {
                if (success) {
                  this.snackBarService.close();
                  this.router.navigateByUrl('/feeds');
                }
            });
      }
  }
}
