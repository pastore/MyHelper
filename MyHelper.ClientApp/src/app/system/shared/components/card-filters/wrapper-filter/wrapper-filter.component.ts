import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterType } from '../../../../../shared/utilities/enums';
import { FilterItem } from '../../../../../shared/models/base/filter-item.model';

@Component({
  selector: 'mh-wrapper-filter',
  templateUrl: './wrapper-filter.component.html',
  styleUrls: ['./wrapper-filter.component.scss']
})
export class WrapperFilterComponent implements OnInit {
  filterType = FilterType;
  filterRequest: any;
  @Input() filterItems: FilterItem[];
  @Output() wrapFilter = new EventEmitter();
  @Input() disabled: boolean;
  @Input() tooltip: string;

  constructor() { }

  ngOnInit() {
    this.filterRequest = Object.assign({});
   }

   updateTagsFilter(tagIds: number[]) {
    this.filterRequest['tagIds'] = tagIds.length > 0 ? tagIds : null;
    this.wrapFilter.emit(this.filterRequest);
  }
}
