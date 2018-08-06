import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { BaseCardsComponent } from '../shared/components/base/base-cards.component';
import { FeedResponse } from '../../shared/models/feeds/feed-response.model';
import { ICard } from '../../shared/models/base/i-card.model';
import { FeedService } from '../../shared/services/feed.service';
import { ILoaderState } from '../../shared/loader/i-loader-state.model';
import { LoaderService } from '../../shared/loader/loader.service';
import { CardType } from '../../shared/utilities/enums';

@Component({
  selector: 'mh-feeds-page',
  templateUrl: './feeds-page.component.html'
})
export class FeedsPageComponent
extends BaseCardsComponent<ICard<FeedResponse>, null>
 implements OnInit {
  screenWidth: number;

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
    this._loaderService.loaderState
      .subscribe((state: ILoaderState) => {
        this.isLoading = state.isShow;
      });
  }

  protected getCards() {
    this._feedService.getFeeds()
    .subscribe((feeds: FeedResponse[]) => {
      this.cards = feeds.map((x) => {
        return { data : x, cardType : CardType.Feed };
      });
    });
  }
  protected handleScroll() {

  }
  protected detectChanges() {
    this._cdr.detectChanges();
  }
}
