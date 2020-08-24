using MyHelper.Api.Models.Request;
using System.Collections.Generic;

namespace MyHelper.Api.Models.Feeds
{
    public class FeedFilterRequest : IFetchRequest
    {
        public string Search { get; set; }

        public IEnumerable<long> TagIds { get; set; } = new List<long>();

        public int? Limit { get; set; }

        public int? Offset { get; set; }
    }
}
