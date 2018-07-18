import { OnInit, HostListener, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { EditCardEventType } from '../../../../shared/utilities/enums';
import { FilterItem } from '../../../../shared/models/base/filter-item.model';
import { BaseCardsComponent } from './base-cards.component';

export abstract class BaseEditCardsComponent<T_Card, T_Filter>
 extends BaseCardsComponent<T_Card, T_Filter>
 implements OnInit, AfterViewInit, AfterViewChecked {
  filterItems: FilterItem[];
  editCardModel: T_Card;
  isCardsVisible = true;
  screenWidth: number;
  searchPlaceholder: string;
  tooltip: string;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth =  window.innerWidth;
  }

  ngOnInit() {
    super.ngOnInit();
    this.screenWidth = window.innerWidth;
    this.setFilterItems();
    this.setTooltip();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
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

  protected setTooltip() {
    if (!this.isCardsVisible) {
      this.tooltip = 'Close edit card.';
    }
  }

  protected abstract setFilterItems();
}
