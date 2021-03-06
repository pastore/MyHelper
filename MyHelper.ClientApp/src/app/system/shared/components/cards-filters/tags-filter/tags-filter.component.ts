import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TagViewModel } from '../../../../../shared/models/tags/tag-view.model';
import { TagService } from '../../../../../shared/services/tag.service';

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
    private _cdr: ChangeDetectorRef ) { }

  ngOnInit() {
    this.tagCtrl = new FormControl();
    this._tagService.tags.subscribe(tags => {
      this.tags = tags;
      this._filteredTags();
      this.subscribeChangeTags();
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
    this.subscribeChangeTags();
  }

  selectTag(tag) {
    this.selectedTags.push(tag);
    this.updateFilter.emit(this.selectedTags.map(x => x.id));
    const index: number = this.filteredTags.indexOf(tag);
    if (index !== -1) {
        this.filteredTags.splice(index, 1);
    }

    this.tagCtrl.reset();
    this.subscribeChangeTags();
  }

  private _filteredTags() {
    this.filteredTags = this.tags.filter((tag) => {
        return !this.selectedTags.some((tagModel) => {
          return tag.id === tagModel.id;
      });
    });
  }

  private selectTagsByName(tagName: string): TagViewModel[] {
    if (!tagName) {
      return this.filteredTags.slice();
    }

    return this.filteredTags.filter(tag => {
      return tag.name.toLowerCase().indexOf(tagName ? tagName.toLowerCase() : '') === 0;
    });
  }

  private subscribeChangeTags() {
    this.reactiveTags = this.tagCtrl.valueChanges
    .pipe(
      startWith(null),
      map(val => this.selectTagsByName(val))
    );
  }
}
