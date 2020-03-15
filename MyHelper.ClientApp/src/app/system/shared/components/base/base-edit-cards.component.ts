import { AfterViewChecked, AfterViewInit, HostListener, OnInit, Directive } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { timer } from 'rxjs';
import { Entity } from '../../../../shared/models/base/entity.model';
import { FilterItem } from '../../../../shared/models/base/filter-item.model';
import { ICard } from '../../../../shared/models/base/i-card.model';
import { Constants } from '../../../../shared/utilities/constants';
import { BaseCardsComponent } from './base-cards.component';

export abstract class BaseEditCardsComponent<T_Card extends ICard<Entity>, T_Filter>
 extends BaseCardsComponent<T_Card, T_Filter>
 implements OnInit, AfterViewInit, AfterViewChecked {
  filterItems: FilterItem[];
  editCardModel: Entity;
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

  openEditCard(start: MatSidenav, card: Entity) {
    this.editCardModel = card ? card : null;
    this.isCardsVisible = false;
    this.setTooltip();
    this.toggleSideNav(start);
  }

  closeEditCard(editCard: Entity) {
    if (editCard) {
      const cardIndex = this.cards.findIndex((x) => x.data.id === editCard.id);
      if (cardIndex >= 0) {
        this.cards[cardIndex].data = editCard;
        timer(1).subscribe(() => {
          this.scrollTo(editCard.id);
        });
      } else {
        this.getCards();
      }
    }

    this.isCardsVisible = true;
    this.setTooltip();
  }

  triggerChangeWrapFilter(wrapFilter, start) {
    this.toggleSideNav(start);

    this.cardsFilterModel['offset'] = 0;
    Object.keys(wrapFilter)
    .forEach(key => {
      this.cardsFilterModel[key] = wrapFilter[key];
    });
    this.getCards();
  }

  setTooltip() {
    if (!this.isCardsVisible) {
      this.tooltip = 'Close edit card.';
    }
  }

  scrollTo(cardId: number) {
    const element = document.getElementById(`card_${cardId}`) as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  protected abstract setFilterItems();
}
