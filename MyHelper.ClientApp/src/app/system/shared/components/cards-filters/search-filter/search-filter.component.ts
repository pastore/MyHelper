import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mh-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  @Output() searchInput = new EventEmitter<string>();
  @Output() toggleFilterSidenav = new EventEmitter();
  @Input() screenWidth: number;
  @Input() disabled: boolean;
  @Input() tooltip: string;
  @Input() placeholder: string;

  constructor() { }

  handleSearchInput(event) {
    const value = event.target.value;
    this.searchInput.emit(value);
  }
}
