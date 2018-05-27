export  class NoteFilterRequest {
  public search: string;
  public tagIds: number[];
  public limit?: number;
  public offset?: number;
}
