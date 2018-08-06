using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Feeds;
using MyHelper.Api.Services.Token;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/feeds")]
    public class FeedsController : BaseController
    {
        private readonly IFeedService _feedService;

        public FeedsController(
            ITokenService tokenService,
            IFeedService feedService) : base(tokenService)
        {
            _feedService = feedService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ServerResponse<List<FeedResponse>>), 200)]
        public async Task<ServerResponse<List<FeedResponse>>> GetNotesAsync()
        {
            return AOResultToServerResponse(await _feedService.GetFeedsAsync(AccountId));
        }
    }
}