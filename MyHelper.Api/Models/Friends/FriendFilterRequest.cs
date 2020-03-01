using MyHelper.Api.Models.Request;

namespace MyHelper.Api.Models.Friends
{
    public class FriendFilterRequest : IFetchRequest
    {
        public string Search { get; set; }

        public int? Limit { get; set; }

        public int? Offset { get; set; }
    }
}
