import { VisibleType } from '../../utilities/enums';
import { Entity } from '../base/entity.model';
import { TagViewModel } from '../tags/tag-view.model';

export class NoteResponse
  implements Entity {
    public id: number;
    public name: string;
    public description: string;
    public visibleType: VisibleType = VisibleType.Private;
    public updateDate: string;
    public appUserId: number;
    public tags: TagViewModel[] = [];
}
