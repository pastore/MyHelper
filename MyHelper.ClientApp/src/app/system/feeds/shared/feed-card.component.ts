import { Component, Input } from '@angular/core';
import { FeedResponse } from '../../../shared/models/feeds/feed-response.model';
import { ICard } from '../../../shared/models/base/i-card.model';
import { FeedType } from '../../../shared/utilities/enums';

@Component({
  selector: 'mh-feed-card',
  templateUrl: './feed-card.component.html'
})
export class FeedCardComponent {
  @Input() card: ICard<FeedResponse>;
  feedType = FeedType;
  isExpandCard = false;
  expandTitle = 'Expand';

  constructor() { }

  showDescription() {
    this.isExpandCard = !this.isExpandCard;
    setTimeout(() => { this.expandTitle = this.isExpandCard ? 'Collapse' : 'Expand'; }, 200);
  }
}
