import { VisibleType } from '../../utilities/enums';

export class NoteRequest {
  public id: number;
  public name: string;
  public description: string;
  public visibleType: VisibleType;
  public appUserId: number;
  public tagIds: number[];
}
