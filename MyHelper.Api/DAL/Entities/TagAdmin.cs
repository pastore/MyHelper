namespace MyHelper.Api.DAL.Entities
{
    public class TagAdmin
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string[] Notes { get; set; }

        public string[] Tasks { get; set; }
    }
}
