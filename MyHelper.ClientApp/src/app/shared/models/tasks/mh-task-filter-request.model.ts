import { MhTaskStatus } from '../../utilities/enums';

export  class MhTaskFilterRequest {
  public fromDate?: Date;
  public toDate?: Date;
  public mhTaskStatus?: MhTaskStatus;
  public search: string;
  public tagIds: number[];
  public limit?: number;
  public offset?: number;
}
