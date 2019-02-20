import { TagViewModel } from '../tags/tag-view.model';
import { ScheduleMhTaskViewModel } from './schedule-mh-task-view.model';
import { MhTaskVisibleType, MhTaskState, MhTaskStatus } from '../../utilities/enums';
import { Entity } from '../base/entity.model';

export class MhTaskResponse
  implements Entity {
    public id: number;
    public name: string;
    public description: string;
    public startDate: Date;
    public finishDate?: Date;
    public mhTaskVisibleType: MhTaskVisibleType = MhTaskVisibleType.Public;
    public mhTaskStatus: MhTaskStatus;
    public mhTaskState: MhTaskState;
    public isRecurring: boolean;
    public scheduleMhTaskViewModel: ScheduleMhTaskViewModel;
    public appUserId: number;
    public tags: TagViewModel[] = [];
}
