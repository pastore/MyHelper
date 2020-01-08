import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'mh-tags-details',
  templateUrl: './tags-details.component.html',
  styleUrls: ['./tags-details.component.scss']
})
export class TagsDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TagsDetailsComponent>) { }

  ngOnInit() {
    console.log("details:" + JSON.stringify( this.data))
  }

  close() {
    this.dialogRef.close();
  }
}
