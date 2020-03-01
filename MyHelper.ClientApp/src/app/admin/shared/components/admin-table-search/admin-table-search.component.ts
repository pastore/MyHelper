import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'mh-admin-table-search',
  templateUrl: './admin-table-search.component.html',
  styleUrls: ['./admin-table-search.component.scss']
})
export class AdminTableSearchComponent implements OnInit, OnDestroy  {
  query = '';
  debouncer = new Subject<string>();
  subs = new Subscription();

  @Input() label = 'Search';
  @Input() placeholder = 'Ex. items';
  @Input() debounceTime = 200;
  @Output() change = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.subs.add(this.debouncer
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged()
      )
      .subscribe(
        (value: string) => { this.change.emit(value); }
      ));
  }

  onInputChange(event: any) {
    this.debouncer.next(event.target.value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
