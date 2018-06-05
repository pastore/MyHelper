import { Component, OnInit, EventEmitter, Input , Output, ChangeDetectorRef, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { TagService } from '../../../../../shared/services/tag.service';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';
import { TagViewModel } from '../../../../../shared/models/tags/tag-view.model';

@Component({
  selector: 'mh-tags-filter',
  templateUrl: './tags-filter.component.html',
  styleUrls: ['./tags-filter.component.scss']
})
export class TagsFilterComponent implements OnInit, AfterViewChecked {
  removable = true;
  tags: TagViewModel[];
  reactiveTags: Observable<TagViewModel[]>;
  selectedTags: TagViewModel[] = [];
  filteredTags: TagViewModel[];
  tagCtrl: FormControl;
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Output() updateFilter = new EventEmitter<number[]>();

  constructor(
    private _tagService: TagService,
    private _authService: AuthenticationService,
    private _cdr: ChangeDetectorRef ) { }

  ngOnInit() {
    this.tagCtrl = new FormControl();
    this._tagService.tags.subscribe(tags => {
      this.tags = tags;
      this._filteredTags();
      this._subscribeChangeTags();
    });
  }

  ngAfterViewChecked() {
    this._cdr.detectChanges();
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
