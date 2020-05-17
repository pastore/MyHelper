import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'mh-cards-top-scroll',
  templateUrl: './cards-top-scroll.component.html',
  styleUrls: ['./cards-top-scroll.component.scss']
})
export class CardsTopScrollComponent implements OnInit  {
  cardListItemClass = 'mat-card';
  @Input() cardList: any;
  @ViewChild('button', { read: ElementRef, static: true }) public button: ElementRef;

  constructor() { }

  ngOnInit() {
    fromEvent(this.cardList, 'scroll')
    .pipe(debounceTime(50))
      .subscribe((result: Event) => {
        const nativeCardList = result.srcElement as Element;
        const firstChild = this.getFirstChild(nativeCardList);
        const nativeButton = this.button.nativeElement;
        if (nativeCardList.scrollTop > firstChild.clientHeight) {
          nativeButton.style.display = 'block';
        } else {
          nativeButton.style.display = 'none';
        }
      });
  }

  onClcik() {
    this.getFirstChild(this.cardList).scrollIntoView({behavior: 'smooth'});
  }

  private getFirstChild(selector) {
    return selector.querySelector(`${this.cardListItemClass}:first-child`);
  }
}
