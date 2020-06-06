import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { Entity } from '../../../../shared/models/base/entity.model';
import { NoteRequest } from '../../../../shared/models/notes/note-request.model';
import { NoteResponse } from '../../../../shared/models/notes/note-response.model';
import { TagRequest } from '../../../../shared/models/tags/tag-request.model';
import { TagViewModel } from '../../../../shared/models/tags/tag-view.model';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { NoteService } from '../../../../shared/services/note.service';
import { TagService } from '../../../../shared/services/tag.service';
import { VisibleType } from '../../../../shared/utilities/enums';
import { arrayFromEnum, isNotNullOrEmpty } from '../../../../shared/utilities/tools';
import { asyncRequiredTagsValidator } from '../../../../shared/validators/required-tags.validator';

@Component({
  selector: 'mh-note-edit-card',
  templateUrl: './note-edit-card.component.html'
})
export class NoteEditCardComponent implements OnInit, OnDestroy {
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: TagViewModel[];
  reactiveTags: Observable<TagViewModel[]>;
  filteredTags: TagViewModel[];
  visibleTypes: any[] = [];
  tagCtrl: FormControl;
  editCardModel: NoteResponse;
  subs = new Subscription();
  @Input() originalEditCardModel: NoteResponse;
  @Output() closeEditCard = new EventEmitter<Entity>();
  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private _noteService: NoteService,
    private _tagService: TagService,
    private _authService: AuthenticationService ) { }

  ngOnInit() {
    this.editCardModel = this.originalEditCardModel ? {... this.originalEditCardModel} : new NoteResponse();
    this.editCardModel.tags = this.originalEditCardModel ? this.originalEditCardModel.tags.slice() : [];
    this.tagCtrl = new FormControl(this.editCardModel.tags, [], asyncRequiredTagsValidator.bind(this));
    this._tagService.tags.subscribe(tags => {
      this.tags = tags;
      this._filteredTags();
      this._subscribeChangeTags();
    });

    this.visibleTypes = [... arrayFromEnum<VisibleType>(VisibleType)];
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onCancel() {
    this.closeEditCard.emit(null);
  }

  onSave(editCardForm: FormGroup) {
    if (editCardForm.valid && this.tagCtrl.valid) {
      const noteRequest = new NoteRequest();
      noteRequest.id = this.editCardModel.id;
      noteRequest.name = this.editCardModel.name;
      noteRequest.description = this.editCardModel.description;
      noteRequest.visibleType = this.editCardModel.visibleType;
      noteRequest.appUserId = this._authService.currentUser.id;
      noteRequest.tagIds = this.editCardModel.tags.map(x => x.id);

      const method = noteRequest.id ? 'updateNote' : 'addNote';

      this._noteService[method](noteRequest)
        .subscribe(x => {
          this.closeEditCard.emit(this.editCardModel);
        });
    }
  }

  addTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    const tagName: string = (value || '').trim();

    if (isNotNullOrEmpty(tagName)
      && !this.matAutocomplete.isOpen
      && !this.tags.some(x => x.name.toLowerCase() === tagName.toLowerCase())
      && !this.editCardModel.tags.some(x => x.name.toLowerCase() === tagName.toLowerCase())
      ) {
      const sub = this._tagService.createTag(new TagRequest(tagName))
        .pipe(take(1))
        .subscribe(tags => {
          this.tags = tags;

          const tag = this.tags.find(x => x.name === tagName);
          if (tag) {
            this.editCardModel.tags.push(tag);
            this.tagCtrl = new FormControl(this.editCardModel.tags, [], asyncRequiredTagsValidator.bind(this));
          }

          this._filteredTags();
          this._subscribeChangeTags();
        });

      this.subs.add(sub);
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: TagViewModel) {
    const index: number = this.editCardModel.tags.indexOf(tag);
    if (index !== -1) {
      this.editCardModel.tags.splice(index, 1);
    }

    this._filteredTags();
    this.tagCtrl.reset();
    this._subscribeChangeTags();
  }

  selectTag(tag) {
    this.editCardModel.tags.push(tag);
    const index: number = this.filteredTags.indexOf(tag);
    if (index !== -1) {
      this.filteredTags.splice(index, 1);
    }

    this.tagsInput.nativeElement.value = '';
    this.tagCtrl.reset();
    this._subscribeChangeTags();
  }

  private _filteredTags() {
    this.filteredTags = this.tags.filter((tag) => {
        return !this.editCardModel.tags.some((tagModel) => {
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
    this.reactiveTags = this.tagCtrl
    .valueChanges
    .pipe(
      startWith(null),
      map(val => this._selectTagsByName(val))
    );
  }
}
