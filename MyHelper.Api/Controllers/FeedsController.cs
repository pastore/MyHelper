using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Feeds.Entities;
using MyHelper.Api.Feeds.Services;
using MyHelper.Api.Models.Feeds;
using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyHelper.Api.Core;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/feeds")]
    public class FeedsController : BaseController
    {
        private readonly ICosmosDbService<Feed> _feedService;

        public FeedsController(
            ICosmosDbService<Feed> feedService)
        {
            _feedService = feedService;
        }

        [HttpGet]
        public async Task<ServerResponse<List<FeedResponse>>> GetFeedsAsync(FeedFilterRequest feedFilterRequest)
        {
            var visibleTypeFriend = EVisibleType.Friend;
            var visibleTypePublic = EVisibleType.Public;

            return await _feedService.GetFeedsAsync(AccountId, feedFilterRequest,
                x => x.VisibleType == visibleTypePublic || x.VisibleType == visibleTypeFriend);
        }
    }
}