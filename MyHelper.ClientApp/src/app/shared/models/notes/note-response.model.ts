import { TagViewModel } from '../tags/tag-view.model';
import { Entity } from '../base/entity.model';

export class NoteResponse
  implements Entity {
    public id: number;
    public name: string;
    public description: string;
    public updateDate: string;
    public appUserId: number;
    public tags: TagViewModel[] = [];
}
