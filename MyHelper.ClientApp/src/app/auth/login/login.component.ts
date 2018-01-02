import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../shared/models/auth/login-request.model';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'mh-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  model: LoginRequest = new LoginRequest();

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.logout();
  }

  login(loginForm: FormGroup) {
      if (loginForm.valid) {
          this.authService.login(this.model)
            .subscribe(success => {
                if (success) {
                    this.router.navigateByUrl('/notes');
                } else {

                }
            },
            error => {
              console.log('Error log in');
            });
      }
  }
}
