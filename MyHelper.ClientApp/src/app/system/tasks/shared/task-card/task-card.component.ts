import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDeleteModel } from '../../../../shared/models/base/card-delete.model';
import { ICard } from '../../../../shared/models/base/i-card.model';
import { MhTaskResponse } from '../../../../shared/models/tasks/mh-task-response.model';
import { CardType, MhTaskState } from '../../../../shared/utilities/enums';
import { CardsDeleteModalComponent } from '../../../shared/components/cards-delete-dialog/cards-delete-dialog.component';

@Component({
  selector: 'mh-task-card',
  templateUrl: './task-card.component.html'
})
export class TaskCardComponent {
  mhTaskStates = MhTaskState;
  isExpandCard = false;
  expandTitle = 'Expand';
  @Input() card: ICard<MhTaskResponse>;
  @Output() openEditCard = new EventEmitter<MhTaskResponse>();
  @Output() emitUpdateTaskStatus = new EventEmitter();
  @Output() deleteMhTask = new EventEmitter<number>();

  constructor(public dialog: MatDialog) { }

  editCard() {
    this.openEditCard.emit(this.card.data);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CardsDeleteModalComponent, {
      data: new CardDeleteModel(this.card.data.id, this.card.data.name, CardType[CardType.Task])
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMhTask.emit(result);
      }
    });
  }

  showDescription() {
    this.isExpandCard = !this.isExpandCard;
    setTimeout(() => { this.expandTitle = this.isExpandCard ? 'Collapse' : 'Expand'; }, 200);
  }

  updateTaskStatus() {
    this.emitUpdateTaskStatus.emit({id: this.card.data.id, status: this.card.data.mhTaskStatus});
  }
}
