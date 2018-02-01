import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagService } from '../../../../shared/services/tag.service';
import { NoteService } from '../../../../shared/services/note.service';
import { NoteResponse } from '../../../../shared/models/notes/note-response.model';
import { FormControl, FormGroup } from '@angular/forms';
import '../../../../shared/utilities/rxjs-operators';
import { Observable } from 'rxjs/Observable';
import { NoteRequest } from '../../../../shared/models/notes/note-request.model';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import TagViewModel from '../../../../shared/models/tags/tag-view.model';

@Component({
  selector: 'mh-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  tags: TagViewModel[];
  reactiveTags: Observable<TagViewModel[]>;
  filteredTags: TagViewModel[];
  tagCtrl: FormControl;
  @Input() card: NoteResponse;
  @Output() closeDetailedNote = new EventEmitter<boolean>();

  constructor(
    private _noteService: NoteService,
    private _tagService: TagService,
    private _authService: AuthenticationService ) { }

  ngOnInit() {
    this.tagCtrl = new FormControl();
    this._tagService.tags.subscribe(tags => {
      this.tags = tags;
      this._filterdTags();
      this._subscribeChangeTags();
    });
  }

  onCancel() {
    this.closeDetailedNote.emit(true);
  }

  onSaveNote(detailedNoteForm: FormGroup) {
    if (detailedNoteForm.valid) {
      const noteRequest = new NoteRequest();
      noteRequest.name = this.card.name;
      noteRequest.description = this.card.description;
      noteRequest.appUserId = this._authService.currentUser.id;
      noteRequest.tagIds = this.card.tags.map(x => x.id);

      this._noteService
        .addNote(noteRequest)
        .subscribe(x => {
          this.closeDetailedNote.emit(true);
        });
    }
  }
  addTag(tag: TagViewModel) {
    const sub = this._tagService.createTag(tag)
    .subscribe(tags => {
      this.tags = tags;
      this.card.tags.push(tag);

      this._filterdTags();
      this._subscribeChangeTags();
      sub.unsubscribe();
    });
  }

  removeTag(tag: TagViewModel) {
    const index: number = this.card.tags.indexOf(tag);
    if (index !== -1) {
      this.card.tags.splice(index, 1);
    }
  }

  selectTag(tag) {
    this.card.tags.push(tag);
    const index: number = this.filteredTags.indexOf(tag);
    if (index !== -1) {
      this.filteredTags.splice(index, 1);
    }

    this.tagCtrl.reset();
    this._subscribeChangeTags();
  }

  private _filterdTags() {
    this.filteredTags = this.tags.filter((tag) => {
        return !this.card.tags.some((tagModel) => {
          return tag.id === tagModel.id;
      });
    });
  }

  private _selectTagsByName(tagName: string): TagViewModel[] {
    if (!tagName) {
      return this.filteredTags.slice();
    }

    return this.filteredTags.filter(tag => {
      return tag.name.toLowerCase().indexOf(tagName ? tagName.toLowerCase() : '') === 0;
    });
  }

  private _subscribeChangeTags() {
    this.reactiveTags = this.tagCtrl.valueChanges
      .startWith(null)
      .map(val => this._selectTagsByName(val));
  }
}
