using MyHelper.Api.Core;
using System;

namespace MyHelper.Api.DAL.Entities
{
    public class Feed
    {
        public long Id { get; set; }

        public string FeedData { get; set; }

        public EFeedType FeedType { get; set; }

        public int FeedRank { get; set; }

        public DateTime CreateDate { get; set; }

        public int AppUserId { get; set; }

        public string AppUserData { get; set; }
    }
}
