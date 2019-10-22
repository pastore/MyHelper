import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ILoaderState } from '../../../shared/loader/i-loader-state.model';
import { LoaderService } from '../../../shared/loader/loader.service';
import { IFriendCard } from '../../../shared/models/base/i-card.model';
import { FriendFilterRequest } from '../../../shared/models/friend/friend-filter-request.model';
import { FriendViewModel } from '../../../shared/models/friend/friend-view.model';
import { FriendSearchService } from '../../../shared/services/friend-search.service';
import { FriendService } from '../../../shared/services/friend.service';
import { ApiRoute } from '../../../shared/utilities/api-route';
import { CardType } from '../../../shared/utilities/enums';
import { BaseCardsComponent } from '../../shared/components/base/base-cards.component';

@Component({
  selector: 'mh-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.scss']
})
export class MyFriendsComponent
extends BaseCardsComponent<IFriendCard<FriendViewModel>, FriendFilterRequest>
implements OnInit {
  constructor(
    private _friendService: FriendService,
    private _friendSearchService: FriendSearchService,
    private _loaderService: LoaderService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this._loaderService.loaderState
      .subscribe((state: ILoaderState) => {
        this.isLoading = state.isShow;
      });
    this._friendSearchService.getFriendSearch()
      .subscribe(searchValue => {
        this.cardsFilterModel['offset'] = 0;
        this.cardsFilterModel['search'] = searchValue;
        this.getCards();
      });
  }

  cancelFriend(card: IFriendCard<FriendViewModel>) {
    this._friendService.cancelFriend(card.data.id)
      .subscribe(isSuccess => {
        if (isSuccess) {
          card.disabled = true;
        }
      });
  }

  protected getCards() {
    this._friendService.getFriends(ApiRoute.MyFriends, this.cardsFilterModel)
      .subscribe((users: FriendViewModel[]) => {
        this.cards = users.map((x) => {
          return { data : x, cardType : CardType.Friend } as IFriendCard<FriendViewModel>;
        });
      });
  }

  protected handleScroll() {
    const offset = Math.floor(this.cards.length / this.cardsFilterModel.limit);
    this.cardsFilterModel.offset = offset * this.cardsFilterModel.limit;

    if ((this.cards.length % this.cardsFilterModel.limit) === 0 && this.isScroll) {
      this._friendService.getFriends(ApiRoute.MyFriends, this.cardsFilterModel, false)
        .subscribe((users: FriendViewModel[]) => {
          if (users.length > 0) {
            this.cards = this.cards.concat(users.map((x) => {
              return { data : x, cardType : CardType.Friend } as IFriendCard<FriendViewModel>;
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
