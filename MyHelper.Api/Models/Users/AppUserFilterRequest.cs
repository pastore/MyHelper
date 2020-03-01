using MyHelper.Api.Models.Request;

namespace MyHelper.Api.Models.Users
{
    public class AppUserFilterRequest : IFetchRequest
    {
        public string Search { get; set; }

        public int? Limit { get; set; }

        public int? Offset { get; set; }
    }
}
