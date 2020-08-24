using MyHelper.Api.Core;

namespace MyHelper.Api.Models.Messanging
{
    public class FeedMessage : IFeedMessage
    {
        public string AppUserId { get; set; }

        public long FeedId { get; set; } 

        public string FeedData { get; set; }

        public EFeedType FeedType { get; set; }

        public EVisibleType VisibleType { get; set; }

        public EFeedAction FeedAction { get; set; }
    }
}
