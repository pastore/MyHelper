import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterItem } from '../../../../shared/models/base/filter-item.model';
import { FilterType } from '../../../../shared/utilities/enums';

@Component({
  selector: 'mh-wrapper-filter',
  templateUrl: './wrapper-filter.component.html',
  styleUrls: ['./wrapper-filter.component.scss']
})
export class WrapperFilterComponent implements OnInit {
  @Input() filterItems: FilterItem[];
  @Output() wrapFilter = new EventEmitter();
  filterType = FilterType;
  filterRequest: any;

  constructor() { }

  ngOnInit() {
    this.filterRequest = Object.assign({});
   }

   updateTagsFilter(tagIds: number[]) {
    this.filterRequest['tagIds'] = tagIds.length > 0 ? tagIds : null;
    this.wrapFilter.emit(this.filterRequest);
  }
}
