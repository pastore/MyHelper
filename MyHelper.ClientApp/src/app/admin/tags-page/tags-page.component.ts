import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TagAdminService } from '../../shared/services/tag-admin.service';
import { TagAdminModel } from '../../shared/models/tags/tag-admin.model';

export interface TagAdminModelModified
{
  name: string,
  notes: string,
  tasks: string
}

@Component({
  selector: 'mh-tags-page',
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.scss']
})

export class TagsPageComponent implements OnInit {
  
  tags: TagAdminModel[];
  displayedColumns: string[] = ['name', 'notes', 'tasks'];
  modifiedTags : TagAdminModelModified[]

  dataSource = new MatTableDataSource<TagAdminModelModified>(this.modifiedTags);
   
   @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this._tagAdminService.tags.subscribe(tags => {
      this.tags = tags;
      this.modifiedTags = this.tags.map(tag => {
        return {
          name: tag.name, 
          notes: JSON.stringify(tag.notes), 
          tasks: JSON.stringify(tag.tasks)
        }
      })
    }),
    
    this.dataSource.paginator = this.paginator;
  }

  constructor(private _tagAdminService: TagAdminService){}

}

