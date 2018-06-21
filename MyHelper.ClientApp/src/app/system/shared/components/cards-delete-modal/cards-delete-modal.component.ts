import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CardDeleteModel } from '../../../../shared/models/base/card-delete.model';
import { CardType } from '../../../../shared/utilities/enums';

@Component({
  selector: 'mh-cards-delete-modal',
  templateUrl: './cards-delete-modal.component.html'
})
export class CardsDeleteModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CardDeleteModel,
    private dialogRef: MatDialogRef<CardsDeleteModalComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close(this.data.id);
  }
}
