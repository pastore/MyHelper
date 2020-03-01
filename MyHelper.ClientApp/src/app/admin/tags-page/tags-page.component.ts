import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { merge } from 'rxjs/observable/merge';
import { tap } from 'rxjs/operators';
import { TagAdminDataSource } from '../../shared/data-sources/tag-admin.datasource';
import { AdminTableFilterRequest } from '../../shared/models/base/admin-table-filter-request.model';
import { TagAdminModel } from '../../shared/models/tags/tag-admin.model';
import { TagRequest } from '../../shared/models/tags/tag-request.model';
import { TagAdminService } from '../../shared/services/tag-admin.service';
import { AdminDialogType } from '../../shared/utilities/enums';
import { TagsDetailsComponent } from './shared/tags-dialog/tags-dialog.component';

@Component({
  selector: 'mh-tags-page',
  templateUrl: './tags-page.component.html'
})

export class TagsPageComponent implements AfterViewInit, OnInit {
  tags: TagAdminModel[];
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: TagAdminDataSource;
  dialogConfig = new MatDialogConfig();
  dialogType = AdminDialogType;
  adminTableFilterRequest = new AdminTableFilterRequest();
  search = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _tagAdminService: TagAdminService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource = new TagAdminDataSource(this._tagAdminService);
    this.dataSource.loadTags(this.adminTableFilterRequest);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this._loadTagsPage())
      )
      .subscribe();
  }

  onChangeSearch(query: string) {
    this.paginator.pageIndex = 0;
    this.search = query;
    this._loadTagsPage();
  }

  openDialog(dialogType: AdminDialogType, tag: TagAdminModel) {
    this.dialogConfig.data = {...tag, ...{dialogType}};

    const dialogRef = this.dialog.open(TagsDetailsComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      switch (data.dialogType) {
        case AdminDialogType.Edit:
          this._editTag(data.id, data.name);
          break;
        case AdminDialogType.Delete:
          this._deleteTag(data.id);
          break;
      }
    });
  }

  _editTag(id: number, name: string) {
    const tagRequest = new TagRequest(name);
    tagRequest.id = id;

    this._tagAdminService.updateTag(tagRequest)
      .subscribe(() => {
        this._loadTagsPage();
      });
  }

  _deleteTag(id: number) {
    this._tagAdminService.deleteTag(id)
      .subscribe(() => {
        this._loadTagsPage();
      });
  }

  _loadTagsPage() {
    this.adminTableFilterRequest.search = this.search;
    this.adminTableFilterRequest.sortDirection = this.sort.direction;
    this.adminTableFilterRequest.limit = this.paginator.pageSize;
    this.adminTableFilterRequest.offset = this.paginator.pageIndex * this.paginator.pageSize;

    this.dataSource.loadTags(this.adminTableFilterRequest);
  }
}

