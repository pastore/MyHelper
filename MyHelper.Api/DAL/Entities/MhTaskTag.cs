namespace MyHelper.Api.DAL.Entities
{
    public class MhTaskTag
    {
        public long MhTaskId { get; set; }
        public MhTask MhTask { get; set; }

        public long TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
