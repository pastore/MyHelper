import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AdminTableFilterRequest } from '../models/base/admin-table-filter-request.model';
import { AppUserViewModel } from '../models/user/app-user-view.model';
import { AppUserService } from '../services/app-user.service';

export class UserAdminDataSource implements DataSource<AppUserViewModel> {
  private usersSubject = new BehaviorSubject<AppUserViewModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public usersLentgh = 0;
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private _appUserService: AppUserService
  ) { }

  loadUsers(adminTableFilterRequest: AdminTableFilterRequest) {
    this.loadingSubject.next(true);

    this._appUserService.getUsersByPage(adminTableFilterRequest)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(pageResult => {
        this.usersLentgh = pageResult.totalCount;
        this.usersSubject.next(pageResult.items);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<AppUserViewModel[]> {
      return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.usersSubject.complete();
      this.loadingSubject.complete();
  }
}
