import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'mh-tags-page',
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.scss']
})

export class TagsPageComponent implements OnInit {

  displayedColumns: string[] = ['position', 'TagName', 'BelongsTo'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

   @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  TagName: string;
  position: number;
  BelongsTo: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, TagName: 'Hydrogen', BelongsTo: 1.0079},
  {position: 2, TagName: 'Helium', BelongsTo: 4.0026},
  {position: 3, TagName: 'Lithium', BelongsTo: 6.941},
  {position: 4, TagName: 'Beryllium', BelongsTo: 9.0122},
  {position: 5, TagName: 'Boron', BelongsTo: 10.811},
  {position: 6, TagName: 'Hydrogen', BelongsTo: 1.0079},
  {position: 7, TagName: 'Helium', BelongsTo: 4.0026},
  {position: 8, TagName: 'Lithium', BelongsTo: 6.941},
  {position: 9, TagName: 'Beryllium', BelongsTo: 9.0122},
  {position: 10, TagName: 'Boron', BelongsTo: 10.811},
  {position: 11, TagName: 'Hydrogen', BelongsTo: 1.0079},
  {position: 12, TagName: 'Helium', BelongsTo: 4.0026},
  {position: 13, TagName: 'Lithium', BelongsTo: 6.941},
  {position: 14, TagName: 'Beryllium', BelongsTo: 9.0122},
  {position: 15, TagName: 'Boron', BelongsTo: 10.811},
  {position: 16, TagName: 'Hydrogen', BelongsTo: 1.0079},
  {position: 17, TagName: 'Helium', BelongsTo: 4.0026},
  {position: 18, TagName: 'Lithium', BelongsTo: 6.941},
  {position: 19, TagName: 'Beryllium', BelongsTo: 9.0122},
  {position: 20, TagName: 'Boron', BelongsTo: 10.811}
];
