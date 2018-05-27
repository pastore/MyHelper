import { OnInit, HostListener, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ICard } from '../../../../shared/models/base/i-card.model';
import { CardType, EditCardEventType } from '../../../../shared/utilities/enums';
import { FilterItem } from '../../../../shared/models/base/filter-item.model';

export abstract class CardsPageComponent<T_Card, T_Filter> implements OnInit, AfterViewInit, AfterViewChecked {

  cards: ICard<T_Card>[] = [];
  filterItems: FilterItem[];
  cardsFilterModel: T_Filter;
  editCardModel: T_Card;
  isCardsVisible = true;
  screenWidth: number;
  tooltip: string;
  searchPlaceholder: string;
  isLoading = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth =  window.innerWidth;
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.setFilterItems();
    this.cardsFilterModel = {} as T_Filter;
    this.setTooltip();
  }

  ngAfterViewInit(): void {
    this.getCards();
  }

  ngAfterViewChecked(): void {
    this.detectChanges();
  }

  openEditCard(start: MatSidenav, card: T_Card) {
    this.editCardModel = card ? card : null;
    this.isCardsVisible = false;
    this.setTooltip();
    this.toggleSideNav(start);
  }

  closeEditCard(editCardEventType: EditCardEventType) {
    if (editCardEventType === EditCardEventType.Save) {
      this.getCards();
    }

    this.isCardsVisible = true;
    this.setTooltip();
  }

  triggerChangeWrapFilter(wrapFilter, start) {
    this.toggleSideNav(start);

    Object.keys(wrapFilter)
    .forEach(key => {
      this.cardsFilterModel[key] = wrapFilter[key];
    });
    this.getCards();
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

  protected setTooltip() {
    if (!this.isCardsVisible) {
      this.tooltip = 'Close edit card.';
    } else if (this.cards.length === 0) {
      this.tooltip = 'There are no cards.';
    }
  }

  protected abstract getCards();
  protected abstract setFilterItems();
  protected abstract detectChanges();
}
