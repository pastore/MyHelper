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
import { MatChipInputEvent } from '@angular/material';
import { TagRequest } from '../../../../shared/models/tags/tag-request-model';
import { Validators } from '@angular/forms';
import { asyncRequiredTagsValidator } from '../../../../shared/validators/required-tags.validator';

@Component({
  selector: 'mh-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  removable = true;
  tags: TagViewModel[];
  reactiveTags: Observable<TagViewModel[]>;
  filteredTags: TagViewModel[];
  tagCtrl: FormControl;
  @Input() cardNote: NoteResponse;
  detailedNote: NoteResponse;
  @Output() closeDetailedNote = new EventEmitter<boolean>();

  constructor(
    private _noteService: NoteService,
    private _tagService: TagService,
    private _authService: AuthenticationService ) { }

  ngOnInit() {
    this.detailedNote = {... this.cardNote};
    this.detailedNote.tags = this.cardNote.tags.slice();
    this.tagCtrl = new FormControl(this.detailedNote.tags, [], asyncRequiredTagsValidator.bind(this));
    this._tagService.tags.subscribe(tags => {
      this.tags = tags;
      this._filteredTags();
      this._subscribeChangeTags();
    });
  }

  onCancel() {
    this.closeDetailedNote.emit(true);
  }

  onSaveNote(detailedNoteForm: FormGroup) {
    if (detailedNoteForm.valid) {
      const noteRequest = new NoteRequest();
      noteRequest.id = this.detailedNote.id;
      noteRequest.name = this.detailedNote.name;
      noteRequest.description = this.detailedNote.description;
      noteRequest.appUserId = this._authService.currentUser.id;
      noteRequest.tagIds = this.detailedNote.tags.map(x => x.id);

      const method = noteRequest.id ? 'updateNote' : 'addNote';

      this._noteService[method](noteRequest)
        .subscribe(x => {
          this.closeDetailedNote.emit(true);
        });
    }
  }
  addTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    const tagName: string = (value || '').trim();

    if (tagName !== '' && !this.detailedNote.tags.some(x => x.name.toLowerCase() === tagName.toLowerCase())) {
      const sub = this._tagService.createTag(new TagRequest(tagName))
      .subscribe(tags => {
        this.tags = tags;

        const tag = this.tags.find(x => x.name === tagName);
        if (tag) {
          this.detailedNote.tags.push(tag);
        }

        this._filteredTags();
        this._subscribeChangeTags();

        if (input) {
          input.value = '';
        }

        sub.unsubscribe();
      });
    }
  }

  removeTag(tag: TagViewModel) {
    const index: number = this.detailedNote.tags.indexOf(tag);
    if (index !== -1) {
      this.detailedNote.tags.splice(index, 1);
    }

    this._filteredTags();
    this.tagCtrl.reset();
    this._subscribeChangeTags();
  }

  selectTag(tag) {
    this.detailedNote.tags.push(tag);
    const index: number = this.filteredTags.indexOf(tag);
    if (index !== -1) {
      this.filteredTags.splice(index, 1);
    }

    this.tagCtrl.reset();
    this._subscribeChangeTags();
  }

  private _filteredTags() {
    this.filteredTags = this.tags.filter((tag) => {
        return !this.detailedNote.tags.some((tagModel) => {
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
