import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TagAdminModel } from '../models/tags/tag-admin.model';
import { TagAdminService } from '../services/tag-admin.service';
import { AdminTableFilterRequest } from '../models/base/admin-table-filter-request.model';

export class TagAdminDataSource implements DataSource<TagAdminModel> {
  private tagsSubject = new BehaviorSubject<TagAdminModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public tagsLentgh = 0;
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private _tagAdminService: TagAdminService
  ) { }

  loadTags(adminTableFilterRequest: AdminTableFilterRequest) {
    this.loadingSubject.next(true);

    this._tagAdminService.getTagsByPage(adminTableFilterRequest)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(pageResult => {
        this.tagsLentgh = pageResult.totalCount;
        this.tagsSubject.next(pageResult.items);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<TagAdminModel[]> {
      return this.tagsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.tagsSubject.complete();
      this.loadingSubject.complete();
  }
}
