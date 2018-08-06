using MyHelper.Api.Core;
using MyHelper.Api.Models.Feed;
using MyHelper.Api.Models.User;
using System;

namespace MyHelper.Api.Models.Response
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
