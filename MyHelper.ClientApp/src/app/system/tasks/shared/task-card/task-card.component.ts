import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICard } from '../../../../shared/models/base/i-card.model';
import { MhTaskResponse } from '../../../../shared/models/tasks/mh-task-response.model';
import { MatDialog } from '@angular/material';
import { MhTaskState, CardType } from '../../../../shared/utilities/enums';
import { CardsDeleteModalComponent } from '../../../shared/components/cards-delete-modal/cards-delete-modal.component';
import { CardDeleteModel } from '../../../../shared/models/base/card-delete.model';

@Component({
  selector: 'mh-task-card',
  templateUrl: './task-card.component.html'
})
export class TaskCardComponent implements OnInit {

  mhTaskStates = MhTaskState;
  isExpandCard = false;
  expandTitle = 'Expand';
  @Input() card: ICard<MhTaskResponse>;
  @Output() openEditCard = new EventEmitter<MhTaskResponse>();
  @Output() emitUpdateTaskStatus = new EventEmitter();
  @Output() deleteMhTask = new EventEmitter<number>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

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
