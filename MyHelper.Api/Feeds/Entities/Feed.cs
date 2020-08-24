using MyHelper.Api.Core;
using MyHelper.Api.Models.Tags;
using System;
using System.Collections.Generic;

namespace MyHelper.Api.Feeds.Entities
{
    public class  Feed
    {
        public Guid Id { get; set; }

        public string AppUserId { get; set; }

        public string SourceAppUserData { get; set; }

        public long FeedId { get; set; }

        public string FeedData { get; set; }

        public EFeedType FeedType { get; set; }

        public EVisibleType VisibleType { get; set; }

        public int FeedRank { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime LastModifiedDate { get; set; }

        public List<TagResponse> Tags { get; set; }
    }
}
