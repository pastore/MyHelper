import { AppUserViewModel } from '../user/app-user-view.model';
import { FriendRequestFlag, FriendRequestDirection } from '../../utilities/enums';

export class FriendViewModel
  extends AppUserViewModel {
    public friendRequestDirection: FriendRequestDirection;
    public friendRequestFlag: FriendRequestFlag;
}
