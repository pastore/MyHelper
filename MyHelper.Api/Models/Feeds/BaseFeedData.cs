using System.Collections.Generic;

namespace MyHelper.Api.Models.Feeds
{
    public class BaseFeedData
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<long> TagIds { get; set; }
    }
}
