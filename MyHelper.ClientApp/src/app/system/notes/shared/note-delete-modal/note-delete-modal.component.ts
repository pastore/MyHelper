import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoteResponse } from '../../../../shared/models/notes/note-response.model';

@Component({
  selector: 'mh-note-delete-modal',
  templateUrl: './note-delete-modal.component.html',
  styleUrls: ['./note-delete-modal.component.scss']
})
export class NoteDeleteModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: NoteResponse,
    private dialogRef: MatDialogRef<NoteDeleteModalComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close(this.data.id);
  }
}
