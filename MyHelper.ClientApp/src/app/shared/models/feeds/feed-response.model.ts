import { FeedType } from '../../utilities/enums';
import { AppUserViewModel } from '../user/app-user-view.model';
import { BaseFeedData } from './base-feed-data.model';
import { Entity } from '../base/entity.model';

export class FeedResponse
  implements Entity {
    public id: number;
    public feedData: BaseFeedData;
    public feedType: FeedType;
    public feedRank: number;
    public createDate: Date;
    public appUserViewModel: AppUserViewModel;
}
