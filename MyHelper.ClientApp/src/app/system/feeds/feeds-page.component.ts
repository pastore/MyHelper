import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { ILoaderState } from '../../shared/loader/i-loader-state.model';
import { LoaderService } from '../../shared/loader/loader.service';
import { ICard } from '../../shared/models/base/i-card.model';
import { FeedResponse } from '../../shared/models/feeds/feed-response.model';
import { FeedService } from '../../shared/services/feed.service';
import { CardType } from '../../shared/utilities/enums';
import { BaseCardsComponent } from '../shared/components/base/base-cards.component';

@Component({
  selector: 'mh-feeds-page',
  templateUrl: './feeds-page.component.html'
})
export class FeedsPageComponent
extends BaseCardsComponent<ICard<FeedResponse>, null>
 implements OnInit {
  screenWidth: number;
  firstLoadDate: Date;
  newCards: ICard<FeedResponse>[];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth =  window.innerWidth;
  }

  constructor(
    private _feedService: FeedService,
    private _loaderService: LoaderService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.screenWidth = window.innerWidth;
    this.newCards = [];
    this._loaderService.loaderState
      .subscribe((state: ILoaderState) => {
        this.isLoading = state.isShow;
      });
    timer(60000).subscribe(() => {
      this._feedService.getFeeds().subscribe((feeds: FeedResponse[]) => {
        const items = feeds
        .filter((x) => {
          return x.createDate > this.firstLoadDate;
        })
        .map((x) => {
          return { data : x, cardType : CardType.Feed };
        });
        this.newCards = items.concat(...this.newCards);
      });
    });
  }

  showNewFeeds() {
    this.cards = this.newCards.concat(...this.cards);
    this.newCards = [];
    const [first] = this.cards;
    this.firstLoadDate = first.data.createDate;
  }

  protected getCards() {
    this._feedService.getFeeds()
    .subscribe((feeds: FeedResponse[]) => {
      this.cards = feeds.map((x, i) => {
        if (i === 0) {
          this.firstLoadDate = x.createDate;
        }
        return { data : x, cardType : CardType.Feed };
      });
    });
  }

  protected handleScroll() {
    // TODO
  }

  protected detectChanges() {
    this._cdr.detectChanges();
  }
}
