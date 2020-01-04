import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RegistrationRequest } from '../../shared/models/auth/registration-request.model';
import { Router } from '@angular/router';
import { SnackBarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'mh-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  model: RegistrationRequest = new RegistrationRequest();

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private snackBarService: SnackBarService) { }

  registration(registrationForm: FormGroup) {
    if (registrationForm.valid) {
        this.authService.createUser(this.model)
          .subscribe(success => {
              if (success) {
                this.snackBarService.close();
                this.router.navigateByUrl('/feeds');
              }
          });
    }
  }
}
