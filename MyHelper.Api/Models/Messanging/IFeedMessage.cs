using MyHelper.Api.Core;
using System;

namespace MyHelper.Api.Models.Messanging
{
    public interface IFeedMessage
    {
        string FeedData { get; set; }

        EFeedType FeedType { get; set; }

        DateTime CreateDate { get; set; }

        int AppUserId { get; set; }
    }
}
