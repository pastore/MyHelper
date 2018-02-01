import { Component, OnInit, EventEmitter, Input , Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TagService } from '../../../../../shared/services/tag.service';
import { NoteResponse } from '../../../../../shared/models/notes/note-response.model';
import { FormControl } from '@angular/forms';
import TagViewModel from '../../../../../shared/models/tags/tag-view.model';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';

@Component({
  selector: 'mh-autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['./autocomplete-filter.component.scss']
})
export class AutocompleteFilterComponent implements OnInit {

  removable = true;
  tags: TagViewModel[];
  reactiveTags: Observable<TagViewModel[]>;
  selectedTags: TagViewModel[] = [];
  filteredTags: TagViewModel[];
  tagCtrl: FormControl;
  @Output() updateFilter = new EventEmitter<number[]>();

  constructor(
    private _tagService: TagService,
    private _authService: AuthenticationService ) { }

  ngOnInit() {
    this.tagCtrl = new FormControl();
    this._tagService.tags.subscribe(tags => {
      this.tags = tags;
      this._filteredTags();
      this._subscribeChangeTags();
    });
  }

  removeTag(tag: TagViewModel) {
    const index: number = this.selectedTags.indexOf(tag);
    if (index !== -1) {
        this.selectedTags.splice(index, 1);
    }

    this.updateFilter.emit(this.selectedTags.map(x => x.id));
    this._filteredTags();
    this.tagCtrl.reset();
    this._subscribeChangeTags();
  }

  selectTag(tag) {
    this.selectedTags.push(tag);
    this.updateFilter.emit(this.selectedTags.map(x => x.id));
    const index: number = this.filteredTags.indexOf(tag);
    if (index !== -1) {
        this.filteredTags.splice(index, 1);
    }

    this.tagCtrl.reset();
    this._subscribeChangeTags();
  }

  private _filteredTags() {
    this.filteredTags = this.tags.filter((tag) => {
        return !this.selectedTags.some((tagModel) => {
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
