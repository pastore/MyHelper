import { Component, Input } from '@angular/core';
import { IFriendCard } from '../../../../shared/models/base/i-card.model';
import { FriendViewModel } from '../../../../shared/models/friend/friend-view.model';

@Component({
  selector: 'mh-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {
  @Input() card: IFriendCard<FriendViewModel>;

  constructor() { }
}
