namespace MyHelper.Api.Models.Response
{
    public class TagAdminResponse 
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string[] Notes { get; set; }

        public string[] Tasks { get; set; }
    }
}
