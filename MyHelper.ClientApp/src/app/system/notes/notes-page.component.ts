import { Component, OnInit } from '@angular/core';
import { NoteResponse } from '../../shared/models/notes/note-response.model';
import { NoteService } from '../../shared/services/note.service';
import { ICard } from '../../shared/models/base/i-card.model';
import { CardType } from '../../shared/utilities/enums';

@Component({
  selector: 'mh-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss']
})
export class NotesPageComponent implements OnInit {

  notes: ICard<NoteResponse>[];
  detailedNote: NoteResponse;
  isNoteListVisible = true;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getNotes()
    .subscribe((noteResponseList: NoteResponse[]) => {
      this.notes = noteResponseList.map((x) => {
        return { data : x, cardType : CardType.Note } as ICard<NoteResponse>;
      });
    });
  }

  addNote() {
    this.detailedNote = new NoteResponse();
    this.isNoteListVisible = false;
  }

  updateNote(note: NoteResponse) {
    this.isNoteListVisible = false;
    this.detailedNote = note;
  }

  closeDetailedNoteView(value: boolean) {
    this.isNoteListVisible = value;
  }
}
