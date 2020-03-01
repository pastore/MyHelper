import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { merge } from 'rxjs/observable/merge';
import { tap } from 'rxjs/operators';
import { UserAdminDataSource } from '../../shared/data-sources/user-admin.datasource';
import { AdminTableFilterRequest } from '../../shared/models/base/admin-table-filter-request.model';
import { AppUserViewModel } from '../../shared/models/user/app-user-view.model';
import { AppUserService } from '../../shared/services/app-user.service';
import { UserRole } from '../../shared/utilities/enums';

@Component({
  selector: 'mh-users-page',
  templateUrl: './users-page.component.html'
})

export class UsersPageComponent implements AfterViewInit, OnInit {
  users: AppUserViewModel[];
  displayedColumns: string[] = ['id', 'name', 'role', 'actions'];
  dataSource: UserAdminDataSource;
  userRole = UserRole;
  adminTableFilterRequest = new AdminTableFilterRequest();
  search = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _appUserService: AppUserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource = new UserAdminDataSource(this._appUserService);
    this.dataSource.loadUsers(this.adminTableFilterRequest);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this._loadUsersPage())
      )
      .subscribe();
  }

  onChangeSearch(query: string) {
    this.paginator.pageIndex = 0;
    this.search = query;
    this._loadUsersPage();
  }

  _loadUsersPage() {
    this.adminTableFilterRequest.search = this.search;
    this.adminTableFilterRequest.sortDirection = this.sort.direction;
    this.adminTableFilterRequest.limit = this.paginator.pageSize;
    this.adminTableFilterRequest.offset = this.paginator.pageIndex * this.paginator.pageSize;

    this.dataSource.loadUsers(this.adminTableFilterRequest);
  }
}
