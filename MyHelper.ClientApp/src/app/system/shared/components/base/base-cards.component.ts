import { OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';

export abstract class BaseCardsComponent<T_Card, T_Filter> implements OnInit, AfterViewInit, AfterViewChecked {
  cards: T_Card[] = [];
  cardsFilterModel: T_Filter;
  isLoading = false;
  @ViewChild('cardList', { read: ElementRef }) public cardList: ElementRef;

  ngOnInit() {
    this.cardsFilterModel = {} as T_Filter;
  }

  ngAfterViewInit(): void {
    this.getCards();
    Observable.fromEvent(this.cardList.nativeElement, 'scroll')
    .debounceTime(50)
      .subscribe((result: Event) => {
        const nativeCardList = result.srcElement;
        if ((nativeCardList.scrollHeight - nativeCardList.scrollTop) <= nativeCardList.clientHeight) {
          this.handleScroll();
        }
      });
  }

  ngAfterViewChecked(): void {
    this.detectChanges();
  }

  triggerChangeSearch(search) {
    this.cardsFilterModel['search'] = search;
    this.getCards();
  }

  protected toggleSideNav(start: MatSidenav) {
    if (start) {
      start.toggle();
    }
  }

  protected abstract getCards();
  protected abstract handleScroll();
  protected abstract detectChanges();
}
