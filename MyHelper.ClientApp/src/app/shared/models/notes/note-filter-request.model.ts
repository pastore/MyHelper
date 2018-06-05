export  class NoteFilterRequest {
  public search: string;
  public tagIds: number[];
  public limit? = 5;
  public offset?: number;
}
