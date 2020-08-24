using MassTransit;
using MyHelper.Api.Feeds.Entities;
using MyHelper.Api.Feeds.Services;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Friends;
using MyHelper.Api.Services.Tags;
using MyHelper.Api.Services.Users;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Core.Messanging.Consumers
{
    public class FeedConsumer : IConsumer<IFeedMessage>
    {
        private readonly ICosmosDbService<Feed> _cosmosDbService;
        private readonly IFriendService _friendService;
        private readonly IAppUserService _appUserService;
        private readonly ITagService _tagService;
        private readonly Dictionary<string, Func<Feed, Task<ServerResponse<bool>>>> _actions;

        public FeedConsumer(
            ICosmosDbService<Feed> cosmosDbService,
            IFriendService friendService, 
            IAppUserService appUserService, 
            ITagService tagService)
        {
            _cosmosDbService = cosmosDbService;
            _friendService = friendService;
            _appUserService = appUserService;
            _tagService = tagService;
            _actions = new Dictionary<string, Func<Feed, Task<ServerResponse<bool>>>>
            {
                { EFeedAction.Create.ToString(), _cosmosDbService.CreateFeedAsync },
                { EFeedAction.Update.ToString(), _cosmosDbService.UpdateFeedAsync },
                { EFeedAction.Delete.ToString(), _cosmosDbService.DeleteFeedAsync }
            };
        }
        public async Task Consume(ConsumeContext<IFeedMessage> context)
        {
            var appUserId = Convert.ToInt64(context.Message.AppUserId);
            var appUser = await _appUserService.GetAppUserAsync(appUserId);

            var jo = JObject.Parse(context.Message.FeedData);
            var tagIds = JsonConvert.DeserializeObject<List<long>>(jo["TagIds"].ToString());
            var tags = _tagService.GetTagsByIdsAsync(tagIds).Result.Result;

            var feed = new Feed
            {
                FeedId = context.Message.FeedId,
                FeedData = context.Message.FeedData,
                FeedType = context.Message.FeedType,
                VisibleType = context.Message.VisibleType,
                SourceAppUserData = JsonConvert.SerializeObject(appUser.Result),
                Tags = tags
            };

            var friends = _friendService.GetFriendIds(appUserId).Result.Result;

            var responces =  await Task.WhenAll(friends.Select(x =>
            {
                feed.AppUserId = x.ToString();
                return _actions[context.Message.FeedAction.ToString()](feed);
            }));

            if (responces.All(x => x.Result))
            {
                await  _cosmosDbService.SaveAsync();
            }
        }
    }
}
