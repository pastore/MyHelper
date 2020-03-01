using MyHelper.Api.Core;
using MyHelper.Api.Models.Users;
using System;

namespace MyHelper.Api.Models.Feeds
{
    public class FeedResponse
    {
        public long Id { get; set; }

        public BaseFeedData FeedData { get; set; }

        public EFeedType FeedType { get; set; }

        public int FeedRank { get; set; }

        public DateTime CreateDate { get; set; }

        public AppUserViewModel AppUserViewModel { get; set; }
    }
}
