import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ILoaderState } from '../../shared/loader/i-loader-state.model';
import { LoaderService } from '../../shared/loader/loader.service';
import { FilterItem } from '../../shared/models/base/filter-item.model';
import { ICard } from '../../shared/models/base/i-card.model';
import { FeedResponse } from '../../shared/models/feeds/feed-response.model';
import { FeedService } from '../../shared/services/feed.service';
import { CardType, FilterType } from '../../shared/utilities/enums';
import { BaseEditCardsComponent } from '../shared/components/base/base-edit-cards.component';
import { FeedFilterRequest } from '../../shared/models/feeds/feed-filter-request.model';

@Component({
  selector: 'mh-feeds-page',
  templateUrl: './feeds-page.component.html'
})
export class FeedsPageComponent
extends BaseEditCardsComponent<ICard<FeedResponse>, FeedFilterRequest>
 implements OnInit, OnDestroy {
  screenWidth: number;
  firstLoadDate: Date;
  newCards: ICard<FeedResponse>[];
  filterItems: FilterItem[];
  timerSubscription: Subscription;

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
    this.timerSubscription = timer(0, 60000).subscribe(() => {
      this._feedService.getFeeds(this.cardsFilterModel, false).subscribe((feeds: FeedResponse[]) => {
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

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  showNewFeeds() {
    this.cards = this.newCards.concat(...this.cards);
    this.newCards = [];
    const [first] = this.cards;
    this.firstLoadDate = first.data.createDate;
  }

  setFilterItems() {
    this.filterItems = [new FilterItem(FilterType.TagsFilter, 'Tags')];
  }

  protected getCards() {
    this._feedService.getFeeds(this.cardsFilterModel)
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
    const offset = Math.floor(this.cards.length / this.cardsFilterModel.limit);
    this.cardsFilterModel.offset = offset * this.cardsFilterModel.limit;

    if ((this.cards.length % this.cardsFilterModel.limit) === 0 && this.isScroll) {
      this._feedService.getFeeds(this.cardsFilterModel, false)
        .subscribe((notes: FeedResponse[]) => {
          if (notes.length > 0) {
            this.cards = this.cards.concat(notes.map((x) => {
              return { data : x, cardType : CardType.Feed } as ICard<FeedResponse>;
            }));
          } else {
            this.isScroll = false;
          }
        });
    }
  }

  protected detectChanges() {
    this._cdr.detectChanges();
  }
}
