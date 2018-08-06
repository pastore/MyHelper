using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Models.Feed
{
    public class BaseFeedData
    {
        public long SourceId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
