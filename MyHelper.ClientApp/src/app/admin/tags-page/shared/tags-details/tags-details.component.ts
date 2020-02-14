import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'mh-tags-details',
  templateUrl: './tags-details.component.html',
  styleUrls: ['./tags-details.component.scss']
})
export class TagsDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TagsDetailsComponent>) { }

  close() {
    this.dialogRef.close();
  }
}
