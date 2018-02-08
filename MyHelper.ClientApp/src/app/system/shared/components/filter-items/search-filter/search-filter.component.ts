import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mh-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  @Output() searchInput = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  handleSearchInput(event) {
    const value = event.target.value;
    this.searchInput.emit(value);
  }
}
