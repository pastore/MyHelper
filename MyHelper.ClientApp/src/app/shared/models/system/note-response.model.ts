import TagViewModel from './tag-view.model';

export class NoteResponse {
  public id: number;

  public name: string;

  public description: string;

  public updateDate: string;

  public appUserId: number;

  public tags: TagViewModel[];
}
