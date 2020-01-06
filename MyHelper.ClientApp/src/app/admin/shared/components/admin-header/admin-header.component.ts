import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SnackBarService } from '../../../../shared/snackbar/snackbar.service';
import { ApiRoute } from '../../../../shared/utilities/api-route';
import { AuthenticationService } from '../../../../shared/services/authentication.service'; 

@Component({
  selector: 'mh-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.snackBarService.close();
    this.authService.logout();
    this.router.navigateByUrl('/' + ApiRoute.Login);
  }

}
