import { FeedType } from '../../utilities/enums';
import { Entity } from '../base/entity.model';
import { TagViewModel } from '../tags/tag-view.model';
import { AppUserViewModel } from '../user/app-user-view.model';
import { BaseFeedData } from './base-feed-data.model';

export class FeedResponse
  implements Entity {
    public id: number;
    public feedData: BaseFeedData;
    public feedType: FeedType;
    public feedRank: number;
    public createDate: Date;
    public lastModifiedDate: Date;
    public appUserViewModel: AppUserViewModel;
    public tags: TagViewModel[] = [];
}
