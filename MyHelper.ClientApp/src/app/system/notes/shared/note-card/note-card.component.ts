import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteResponse } from '../../../../shared/models/notes/note-response.model';
import { ICard } from '../../../../shared/models/base/i-card.model';

@Component({
  selector: 'mh-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() card: ICard<NoteResponse>;
  @Output() updateNote = new EventEmitter<NoteResponse>();

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.updateNote.emit(this.card.data);
  }
}
