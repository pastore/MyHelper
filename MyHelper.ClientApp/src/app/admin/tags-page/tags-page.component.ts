import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TagAdminService } from '../../shared/services/tag-admin.service';
import { TagAdminModel } from '../../shared/models/tags/tag-admin.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TagsDetailsComponent } from './shared/tags-details/tags-details.component';
import { TagAdminViewModel } from '../../shared/models/tags/tag-admin-view.model';

@Component({
  selector: 'mh-tags-page',
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.scss']
})

export class TagsPageComponent implements OnInit {

  tags: TagAdminModel[];
  viewTags: TagAdminViewModel[] = [{ id: 1, name: 'tag1', actions: '' }, { id: 2, name: 'tag2', actions: '' }]
  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource = new MatTableDataSource<TagAdminViewModel>(this.viewTags);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this._tagAdminService.getTags().subscribe(
      tags => {
        this.tags = tags;
      })
    console.log(JSON.stringify(this.tags));
    this.dataSource.paginator = this.paginator;
  }

  constructor(private _tagAdminService: TagAdminService, public dialog: MatDialog) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '500px';
    dialogConfig.width = '500px';
    dialogConfig.data = this.tags;
    this.viewTags = this.tags.map(t => new TagAdminViewModel(t.id, t.name, null));
    console.log(JSON.stringify(this.tags));
    this.dialog.open(TagsDetailsComponent, dialogConfig);
  }

  deleteTag(id: number) {
    this._tagAdminService.deleteTag(id);
  }

}

