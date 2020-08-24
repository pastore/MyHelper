using MyHelper.Api.Core;

namespace MyHelper.Api.Models.Messanging
{
    public interface IFeedMessage
    {
        string AppUserId { get; set; }

        public long FeedId { get; set; }

        string FeedData { get; set; }

        EFeedType FeedType { get; set; }

        public EVisibleType VisibleType { get; set; }

        EFeedAction FeedAction { get; set; }
    }
}
