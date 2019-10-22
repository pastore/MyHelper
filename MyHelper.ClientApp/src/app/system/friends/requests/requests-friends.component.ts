import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseCardsComponent } from '../../shared/components/base/base-cards.component';
import { FriendViewModel } from '../../../shared/models/friend/friend-view.model';
import { FriendFilterRequest } from '../../../shared/models/friend/friend-filter-request.model';
import { FriendService } from '../../../shared/services/friend.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { ILoaderState } from '../../../shared/loader/i-loader-state.model';
import { ApiRoute } from '../../../shared/utilities/api-route';
import { CardType, FriendRequestFlag, FriendRequestDirection } from '../../../shared/utilities/enums';
import { IFriendCard } from '../../../shared/models/base/i-card.model';
import { FriendSearchService } from '../../../shared/services/friend-search.service';

@Component({
  selector: 'mh-requests-friends',
  templateUrl: './requests-friends.component.html',
  styleUrls: ['./requests-friends.component.scss']
})
export class RequestsFriendsComponent
extends BaseCardsComponent<IFriendCard<FriendViewModel>, FriendFilterRequest>
implements OnInit {
  FriendRequestFlag = FriendRequestFlag;
  requestsByMes: IFriendCard<FriendViewModel>[] = [];
  requestsToMes: IFriendCard<FriendViewModel>[] = [];

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
        this.cardsFilterModel['search'] = searchValue;
        this.getCards();
      });
  }

  updateRequestFriend(card: IFriendCard<FriendViewModel>, friendRequestFlag: FriendRequestFlag) {
    this._friendService.updateFriendRequest(card.data.id, friendRequestFlag)
      .subscribe(isSuccess => {
        if (isSuccess ) {
          if (friendRequestFlag === FriendRequestFlag.None) {
            card.disabled = false;
          } else {
            card.disabled = true;
          }
        }
      });
  }

  deleteFriend(card: IFriendCard<FriendViewModel>) {
    this._friendService.deleteFriend(card.data.id)
      .subscribe(isSuccess => {
        if (isSuccess) {
          card.disabled = true;
        }
      });
  }

  protected getCards() {
    this._friendService.getFriends(ApiRoute.RequestsFriends, this.cardsFilterModel)
      .subscribe((users: FriendViewModel[]) => {
        this.cards = users.map((x) => {
          return { data : x, cardType : CardType.Friend } as IFriendCard<FriendViewModel>;
        });

        this._separateRequests();
      });
  }
  protected handleScroll() {
    const offset = Math.floor(this.cards.length / this.cardsFilterModel.limit);
    this.cardsFilterModel.offset = offset * this.cardsFilterModel.limit;

    if ((this.cards.length % this.cardsFilterModel.limit) === 0 && this.isScroll) {
      this._friendService.getFriends(ApiRoute.RequestsFriends, this.cardsFilterModel, false)
        .subscribe((users: FriendViewModel[]) => {
          if (users.length > 0) {
            this.cards = this.cards.concat(users.map((x) => {
              return { data : x, cardType : CardType.Friend } as IFriendCard<FriendViewModel>;
            }));
            this._separateRequests();
          } else {
            this.isScroll = false;
          }
        });
    }
  }

  protected detectChanges() {
    this._cdr.detectChanges();
  }

  private _separateRequests() {
    this.requestsByMes = this.cards
      .filter(x => x.data.friendRequestDirection === FriendRequestDirection.ByMe);
    this.requestsToMes = this.cards
    .filter(x => x.data.friendRequestDirection === FriendRequestDirection.ToMe);
  }
}
