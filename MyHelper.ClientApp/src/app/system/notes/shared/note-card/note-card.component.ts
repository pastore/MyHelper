import { Component, OnInit, Input } from '@angular/core';
import { NoteResponse } from '../../../../shared/models/system/note-response.model';
import { ICard } from '../../../../shared/models/base/i-card.model';

@Component({
  selector: 'mh-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() card: ICard<NoteResponse>;

  constructor() { }

  ngOnInit() {
  }

}
