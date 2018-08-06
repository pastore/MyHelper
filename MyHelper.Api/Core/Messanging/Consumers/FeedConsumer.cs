using MassTransit;
using MyHelper.Api.Models.Messanging;
using System.Threading.Tasks;
using MyHelper.Api.Services.Feeds;

namespace MyHelper.Api.Core.Messanging.Consumers
{
    public class FeedConsumer : IConsumer<IFeedMessage>
    {
        private readonly IFeedService _feedService;

        public FeedConsumer(IFeedService feedService)
        {
            _feedService = feedService;
        }
        public async Task Consume(ConsumeContext<IFeedMessage> context)
        {
            var feedMessage = new FeedMessage()
            {
                FeedData = context.Message.FeedData,
                FeedType = context.Message.FeedType,
                AppUserId = context.Message.AppUserId,
                CreateDate = context.Message.CreateDate
            };
            await _feedService.CreateFeedAsync(feedMessage);

            await context.RespondAsync<FeedMessage>(feedMessage);
        }
    }
}
