import { ScheduleMhTaskType } from '../../utilities/enums';

export class ScheduleMhTaskViewModel {
  public scheduleMhTaskType: ScheduleMhTaskType = ScheduleMhTaskType.Daily;
  public maxCount?: number;
}
