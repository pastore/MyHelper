import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AdminDialogType } from '../../../../shared/utilities/enums';

@Component({
  selector: 'mh-tags-details',
  templateUrl: './tags-dialog.component.html'
})
export class TagsDetailsComponent {
  dialogType = AdminDialogType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TagsDetailsComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close(this.data);
  }
}
