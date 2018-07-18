import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NoteResponse } from '../../../../shared/models/notes/note-response.model';
import { ICard } from '../../../../shared/models/base/i-card.model';

import { MatDialog } from '@angular/material';
import { CardDeleteModel } from '../../../../shared/models/base/card-delete.model';
import { CardsDeleteModalComponent } from '../../../shared/components/cards-delete-modal/cards-delete-modal.component';
import { CardType } from '../../../../shared/utilities/enums';
@Component({
  selector: 'mh-note-card',
  templateUrl: './note-card.component.html'
})
export class NoteCardComponent {
  isExpandCard = false;
  expandTitle = 'Expand';
  @Input() card: ICard<NoteResponse>;
  @Output() openEditCard = new EventEmitter<NoteResponse>();
  @Output() deleteNote = new EventEmitter<number>();

  constructor(public dialog: MatDialog) { }

  editCard() {
    this.openEditCard.emit(this.card.data);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CardsDeleteModalComponent, {
      data: new CardDeleteModel(this.card.data.id, this.card.data.name, CardType[CardType.Note])
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
