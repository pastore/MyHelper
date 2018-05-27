import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagService } from '../../../../shared/services/tag.service';
import { TaskService } from '../../../../shared/services/task.service';
import { MhTaskResponse } from '../../../../shared/models/tasks/mh-task-response.model';
import { FormControl, FormGroup } from '@angular/forms';
import '../../../../shared/utilities/rxjs-operators';
import { Observable } from 'rxjs/Observable';
import { MhTaskRequest } from '../../../../shared/models/tasks/mh-task-request.model';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { TagViewModel } from '../../../../shared/models/tags/tag-view.model';
import { MatChipInputEvent } from '@angular/material';
import { TagRequest } from '../../../../shared/models/tags/tag-request.model';
import { Validators } from '@angular/forms';
import { asyncRequiredTagsValidator } from '../../../../shared/validators/required-tags.validator';
import { EditCardEventType, ScheduleMhTaskType, MhTaskVisibleType } from '../../../../shared/utilities/enums';
import { ScheduleMhTaskViewModel } from '../../../../shared/models/tasks/schedule-mh-task-view.model';
import { arrayFromEnum, isNotNullOrEmpty } from '../../../../shared/utilities/tools';

@Component({
  selector: 'mh-task-edit-card',
  templateUrl: './task-edit-card.component.html'
})
export class TaskEditCardComponent implements OnInit {

  removable = true;
  tags: TagViewModel[];
  reactiveTags: Observable<TagViewModel[]>;
  filteredTags: TagViewModel[];
  scheduleMhTaskTypes: any[] = [];
  mhTaskVisibleTypes: any[] = [];
  tagCtrl: FormControl;
  editCardModel: MhTaskResponse;
  isTagsSelected = false;
  @Input() originalEditCardModel: MhTaskResponse;
  @Output() closeEditCard = new EventEmitter<EditCardEventType>();

  constructor(
    private _taskService: TaskService,
    private _tagService: TagService,
    private _authService: AuthenticationService ) { }

  ngOnInit() {
    this.editCardModel = this.originalEditCardModel ? {... this.originalEditCardModel} : new MhTaskResponse();
    this.editCardModel.tags = this.originalEditCardModel ? this.originalEditCardModel.tags.slice() : [];
    this.editCardModel.scheduleMhTask = this.originalEditCardModel ?
      this.originalEditCardModel.scheduleMhTask : new ScheduleMhTaskViewModel();
    this.tagCtrl = new FormControl(this.editCardModel.tags, [], asyncRequiredTagsValidator.bind(this));
    this._tagService.tags.subscribe(tags => {
      this.tags = tags;
      this._filteredTags();
      this._subscribeChangeTags();
    });

    this.scheduleMhTaskTypes = [... arrayFromEnum<ScheduleMhTaskType>(ScheduleMhTaskType)].filter((x) => x.id !== 0);
    this.mhTaskVisibleTypes = [... arrayFromEnum<MhTaskVisibleType>(MhTaskVisibleType)];
  }

  onCancel() {
    this.closeEditCard.emit(EditCardEventType.Cancel);
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
      mhTaskRequest.mhTaskVisibleType = this.editCardModel.mhTaskVisibleType;
      mhTaskRequest.isRecurring = this.editCardModel.isRecurring;
      mhTaskRequest.scheduleMhTask = this.editCardModel.scheduleMhTask;

      const method = mhTaskRequest.id ? 'updateTask' : 'addTask';

      this._taskService[method](mhTaskRequest)
        .subscribe(x => {
          this.closeEditCard.emit(EditCardEventType.Save);
        });
    }
  }

  addTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    const tagName: string = (value || '').trim();

    if (isNotNullOrEmpty(tagName) && !this.editCardModel.tags.some(x => x.name.toLowerCase() === tagName.toLowerCase())
      && !this.isTagsSelected) {
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
    this.isTagsSelected = false;
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

    this.tagCtrl.reset();
    this._subscribeChangeTags();
    this.isTagsSelected = true;
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
    this.reactiveTags = this.tagCtrl.valueChanges
      .startWith(null)
      .map(val => this._selectTagsByName(val));
  }
}
