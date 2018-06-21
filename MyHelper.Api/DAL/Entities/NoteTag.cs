namespace MyHelper.Api.DAL.Entities
{
    public class NoteTag
    {
        public long NoteId { get; set; }
        public Note Note { get; set; }

        public long TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
