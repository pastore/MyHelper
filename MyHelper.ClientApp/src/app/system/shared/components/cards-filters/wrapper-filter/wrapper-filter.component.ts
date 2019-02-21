import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterType } from '../../../../../shared/utilities/enums';
import { FilterItem } from '../../../../../shared/models/base/filter-item.model';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'mh-wrapper-filter',
  templateUrl: './wrapper-filter.component.html',
  styleUrls: ['./wrapper-filter.component.scss']
})
export class WrapperFilterComponent implements OnInit {
  filterType = FilterType;
  filterRequest: any;
  @Input() filterItems: FilterItem[];
  @Input() disabled: boolean;
  @Output() updateWrapFilter = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.filterRequest = Object.assign({});
  }

  handleUpdateFilter(eventItem, filterItem: FilterItem) {
    switch (filterItem.type) {
      case FilterType.TagsFilter:
        this.filterRequest['tagIds'] = eventItem.length > 0 ? eventItem : null;
        break;
      case FilterType.DateTimeFilter:
        this.filterRequest[filterItem.placeholder + 'Date'] = eventItem.value ? eventItem.value.toISOString() : '';
        break;
    }
    this.updateWrapFilter.emit(this.filterRequest);
  }
}
