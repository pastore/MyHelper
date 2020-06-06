import { ScheduleMhTaskViewModel } from './schedule-mh-task-view.model';
import { VisibleType, MhTaskStatus } from '../../utilities/enums';

export class MhTaskRequest {
  public id: number;
  public name: string;
  public description: string;
  public startDate: Date;
  public visibleType: VisibleType;
  public mhTaskStatus: MhTaskStatus;
  public isRecurring: boolean;
  public scheduleMhTaskViewModel: ScheduleMhTaskViewModel;
  public appUserId: number;
  public tagIds: number[];
}
