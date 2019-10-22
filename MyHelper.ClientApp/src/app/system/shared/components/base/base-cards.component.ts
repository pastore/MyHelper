import { AfterViewChecked, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Constants } from '../../../../shared/utilities/constants';

export abstract class BaseCardsComponent<T_Card, T_Filter> implements OnInit, AfterViewInit, AfterViewChecked {
  cards: T_Card[] = [];
  cardsFilterModel: T_Filter;
  isLoading = false;
  isScroll = true;
  @ViewChild('cardList', { read: ElementRef }) public cardList: ElementRef;

  ngOnInit() {
    this.cardsFilterModel = {} as T_Filter;
    this.cardsFilterModel['limit'] = Constants.CardsPerPage;
  }

  ngAfterViewInit(): void {
    this.getCards();
    fromEvent(this.cardList.nativeElement, 'scroll')
    .pipe(debounceTime(50))
      .subscribe((result: Event) => {
        const nativeCardList = result.srcElement as Element;
        if ((nativeCardList.scrollHeight - nativeCardList.scrollTop) <= nativeCardList.clientHeight) {
          this.handleScroll();
        }
      });
  }

  ngAfterViewChecked(): void {
    this.detectChanges();
  }

  triggerChangeSearch(search) {
    this.cardsFilterModel['offset'] = 0;
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
