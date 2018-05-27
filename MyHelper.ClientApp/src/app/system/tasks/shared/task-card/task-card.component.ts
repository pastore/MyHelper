import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICard } from '../../../../shared/models/base/i-card.model';
import { MhTaskResponse } from '../../../../shared/models/tasks/mh-task-response.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'mh-task-card',
  templateUrl: './task-card.component.html'
})
export class TaskCardComponent implements OnInit {

  isExpandCard = false;
  expandTitle = 'Expand';
  @Input() card: ICard<MhTaskResponse>;
  @Output() openEditCard = new EventEmitter<MhTaskResponse>();
  @Output() emitUpdateTaskStatus = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  editCard() {
    this.openEditCard.emit(this.card.data);
  }

  showDescription() {
    this.isExpandCard = !this.isExpandCard;
    setTimeout(() => { this.expandTitle = this.isExpandCard ? 'Collapse' : 'Expand'; }, 200);
  }

  updateTaskStatus() {
    this.emitUpdateTaskStatus.emit({id: this.card.data.id, status: this.card.data.mhTaskStatus});
  }
}
