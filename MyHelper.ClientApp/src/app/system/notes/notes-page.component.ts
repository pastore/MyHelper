import { Component, OnInit } from '@angular/core';
import { NoteResponse } from '../../shared/models/system/note-response.model';
import { NoteService } from '../../shared/services/note.service';
import { ICard } from '../../shared/models/base/i-card.model';
import { CardType } from '../../shared/models/base/card-type';

@Component({
  selector: 'mh-notes',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss']
})
export class NotesPageComponent implements OnInit {

  notes: ICard<NoteResponse>[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getNotes()
    .subscribe((noteResponseList: NoteResponse[]) => {
      this.notes = noteResponseList.map((x) => {
        return { data : x, cardType : CardType.Note } as ICard<NoteResponse>;
      });
    });
  }
}
