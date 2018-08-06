using MyHelper.Api.Core;
using System;

namespace MyHelper.Api.Models.Messanging
{
    public class FeedMessage : IFeedMessage
    {

        public string FeedData { get; set; }

        public EFeedType FeedType { get; set; }

        public DateTime CreateDate { get; set; }

        public int AppUserId { get; set; }
    }
}
