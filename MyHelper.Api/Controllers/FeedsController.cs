using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Feeds;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Feeds;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/feeds")]
    public class FeedsController : BaseController
    {
        private readonly IFeedService _feedService;

        public FeedsController(
            IFeedService feedService)
        {
            _feedService = feedService;
        }

        [HttpGet]
        public async Task<ServerResponse<List<FeedResponse>>> GetNotesAsync()
        {
            return await _feedService.GetFeedsAsync(AccountId);
        }
    }
}