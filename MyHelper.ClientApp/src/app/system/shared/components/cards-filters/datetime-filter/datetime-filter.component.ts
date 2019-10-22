import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mh-datetime-filter',
  templateUrl: './datetime-filter.component.html',
  styleUrls: ['./datetime-filter.component.scss']
})
export class DatetimeFilterComponent {
  @Output() updateFilter = new EventEmitter<string>();
  @Input() placeholder: string;
  @Input() value: any;

  constructor() { }

  selectedDate(event) {
    this.updateFilter.emit(event);
  }
}
