using MyHelper.Api.Core;
using MyHelper.Api.Models.Users;
using System;
using System.Collections.Generic;
using MyHelper.Api.Models.Tags;

namespace MyHelper.Api.Models.Feeds
{
    public class FeedResponse
    {
        public long Id { get; set; }

        public BaseFeedData FeedData { get; set; }

        public EFeedType FeedType { get; set; }

        public int FeedRank { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime LastModifiedDate { get; set; }

        public AppUserViewModel AppUserViewModel { get; set; }

        public List<TagResponse> Tags { get; set; }
    }
}
