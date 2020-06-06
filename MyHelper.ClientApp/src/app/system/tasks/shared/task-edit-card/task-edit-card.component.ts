import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Entity } from '../../../../shared/models/base/entity.model';
import { TagRequest } from '../../../../shared/models/tags/tag-request.model';
import { TagViewModel } from '../../../../shared/models/tags/tag-view.model';
import { MhTaskRequest } from '../../../../shared/models/tasks/mh-task-request.model';
import { MhTaskResponse } from '../../../../shared/models/tasks/mh-task-response.model';
import { ScheduleMhTaskViewModel } from '../../../../shared/models/tasks/schedule-mh-task-view.model';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { TagService } from '../../../../shared/services/tag.service';
import { TaskService } from '../../../../shared/services/task.service';
import { ScheduleMhTaskType, VisibleType } from '../../../../shared/utilities/enums';
import { arrayFromEnum, isNotNullOrEmpty } from '../../../../shared/utilities/tools';
import { asyncRequiredTagsValidator } from '../../../../shared/validators/required-tags.validator';

@Component({
  selector: 'mh-task-edit-card',
  templateUrl: './task-edit-card.component.html'
})
export class TaskEditCardComponent implements OnInit {
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: TagViewModel[];
  reactiveTags: Observable<TagViewModel[]>;
  filteredTags: TagViewModel[];
  scheduleMhTaskTypes: any[] = [];
  visibleTypes: any[] = [];
  tagCtrl: FormControl;
  editCardModel: MhTaskResponse;
  @Input() originalEditCardModel: MhTaskResponse;
  @Output() closeEditCard = new EventEmitter<Entity>();
  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private _taskService: TaskService,
    private _tagService: TagService,
    private _authService: AuthenticationService ) { }

  ngOnInit() {
    this.editCardModel = this.originalEditCardModel ? {... this.originalEditCardModel} : new MhTaskResponse();
    this.editCardModel.tags = this.originalEditCardModel ? this.originalEditCardModel.tags.slice() : [];
    this.editCardModel.scheduleMhTaskViewModel = this.originalEditCardModel && this.originalEditCardModel.scheduleMhTaskViewModel
      ? {... this.originalEditCardModel.scheduleMhTaskViewModel}
      : new ScheduleMhTaskViewModel();
    this.tagCtrl = new FormControl(this.editCardModel.tags, [], asyncRequiredTagsValidator.bind(this));
    this._tagService.tags.subscribe(tags => {
      this.tags = tags;
      this._filteredTags();
      this._subscribeChangeTags();
    });

    this.scheduleMhTaskTypes = [... arrayFromEnum<ScheduleMhTaskType>(ScheduleMhTaskType)].filter((x) => x.id !== 0);
    this.visibleTypes = [... arrayFromEnum<VisibleType>(VisibleType)];
  }

  onCancel() {
    this.closeEditCard.emit(null);
  }

  onSave(editCardForm: FormGroup) {
    if (editCardForm.valid && this.tagCtrl.valid) {
      const mhTaskRequest = new MhTaskRequest();
      mhTaskRequest.id = this.editCardModel.id;
      mhTaskRequest.name = this.editCardModel.name;
      mhTaskRequest.description = this.editCardModel.description;
      mhTaskRequest.appUserId = this._authService.currentUser.id;
      mhTaskRequest.tagIds = this.editCardModel.tags.map(x => x.id);
      mhTaskRequest.startDate = this.editCardModel.startDate;
      mhTaskRequest.visibleType = this.editCardModel.visibleType;
      mhTaskRequest.isRecurring = this.editCardModel.isRecurring;
      mhTaskRequest.scheduleMhTaskViewModel = this.editCardModel.scheduleMhTaskViewModel;

      const method = mhTaskRequest.id ? 'updateTask' : 'addTask';

      this._taskService[method](mhTaskRequest)
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
      && !this.editCardModel.tags.some(x => x.name.toLowerCase() === tagName.toLowerCase())
      ) {
      const sub = this._tagService.createTag(new TagRequest(tagName))
        .subscribe(tags => {
          this.tags = tags;

          const tag = this.tags.find(x => x.name === tagName);
          if (tag) {
            this.editCardModel.tags.push(tag);
            this.tagCtrl = new FormControl(this.editCardModel.tags, [], asyncRequiredTagsValidator.bind(this));
          }

          this._filteredTags();
          this._subscribeChangeTags();

          sub.unsubscribe();
        });
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

  selectTag(tag: TagViewModel) {
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
