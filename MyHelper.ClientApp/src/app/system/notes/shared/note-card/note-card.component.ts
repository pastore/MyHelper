import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteResponse } from '../../../../shared/models/notes/note-response.model';
import { ICard } from '../../../../shared/models/base/i-card.model';
import { MatDialog } from '@angular/material';
import { NoteDeleteModalComponent } from '../note-delete-modal/note-delete-modal.component';

@Component({
  selector: 'mh-note-card',
  templateUrl: './note-card.component.html'
})
export class NoteCardComponent implements OnInit {
  isExpandCard = false;
  expandTitle = 'Expand';
  @Input() card: ICard<NoteResponse>;
  @Output() openEditCard = new EventEmitter<NoteResponse>();
  @Output() deleteNote = new EventEmitter<number>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  editCard() {
    this.openEditCard.emit(this.card.data);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NoteDeleteModalComponent, {
      data: this.card.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNote.emit(result);
      }
    });
  }

  showDescription() {
    this.isExpandCard = !this.isExpandCard;
    setTimeout(() => { this.expandTitle = this.isExpandCard ? 'Collapse' : 'Expand'; }, 200);
  }
}
