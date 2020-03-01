import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { AppUserViewModel } from '../../../../shared/models/user/app-user-view.model';
import { Router } from '@angular/router';
import { ApiRoute } from '../../../../shared/utilities/api-route';
import { SnackBarService } from '../../../../shared/snackbar/snackbar.service';

@Component({
  selector: 'mh-system-header',
  templateUrl: './system-header.component.html',
  styleUrls: ['./system-header.component.scss']
})
export class SystemHeaderComponent implements OnInit {
  user: AppUserViewModel;
  @Output() toggleSidenav = new EventEmitter();
  @Input() screenWidth: number;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.user = this.authService.currentUser;
  }

  logOut() {
    this.snackBarService.close();
    this.authService.clearCredentials();
    this.router.navigateByUrl(ApiRoute.Default + ApiRoute.Login);
  }
}
