namespace MyHelper.Api.Models.Tags
{
    public class TagAdminResponse 
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string[] Notes { get; set; }

        public string[] Tasks { get; set; }
    }
}
