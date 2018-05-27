import { ScheduleMhTaskViewModel } from './schedule-mh-task-view.model';
import { MhTaskVisibleType, MhTaskStatus } from '../../utilities/enums';

export class MhTaskRequest {
  public id: number;
  public name: string;
  public description: string;
  public startDate: Date;
  public mhTaskVisibleType: MhTaskVisibleType;
  public mhTaskStatus: MhTaskStatus;
  public isRecurring: boolean;
  public scheduleMhTask: ScheduleMhTaskViewModel;
  public appUserId: number;
  public tagIds: number[];
}
