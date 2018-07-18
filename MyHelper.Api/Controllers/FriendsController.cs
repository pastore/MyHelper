using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Friends;
using System.Threading.Tasks;
using MyHelper.Api.Core;
using MyHelper.Api.Models.Friend;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Services.Token;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/friends")]
    public class FriendsController : BaseController
    {
        private readonly IFriendService _friendService;

        public FriendsController(IFriendService friendService, ITokenService tokenService) : base(tokenService)
        {
            _friendService = friendService;
        }

        [HttpGet("search")]
        [ProducesResponseType(typeof(ServerResponse<List<FriendViewModel>>), 200)]
        public async Task<ServerResponse<List<FriendViewModel>>> GetSeacrhFriendsAsync(FriendFilterRequest friendFilterRequest)
        {
            return AOResultToServerResponse(await _friendService.GetSearchFriendsAsync(AccountId, friendFilterRequest));
        }

        [HttpGet("my")]
        [ProducesResponseType(typeof(ServerResponse<List<FriendViewModel>>), 200)]
        public async Task<ServerResponse<List<FriendViewModel>>> GetMyFriendsAsync(FriendFilterRequest friendFilterRequest)
        {
            return AOResultToServerResponse(await _friendService.GetFriendsByRequestFlag(AccountId, EFriendRequestFlag.Approved, friendFilterRequest));
        }

        [HttpGet("requests")]
        [ProducesResponseType(typeof(ServerResponse<List<FriendViewModel>>), 200)]
        public async Task<ServerResponse<List<FriendViewModel>>> GetRequestsFriendsAsync(FriendFilterRequest friendFilterRequest)
        {
            return AOResultToServerResponse(await _friendService.GetFriendsByRequestFlag(AccountId, EFriendRequestFlag.None, friendFilterRequest));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> InviteFriendAsync([FromBody]int personId)
        {
            return AOResultToServerResponse(await _friendService.InviteFriendAsync(AccountId, personId));
        }

        [HttpPut]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> CancelFriendAsync([FromBody]int personId)
        {
            return AOResultToServerResponse(await _friendService.CancelFriendAsync(AccountId, personId));
        }

        [HttpPatch("{personId}")]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> UpdateFriendRequestAsync(int personId, [FromBody] EFriendRequestFlag eFriendRequestFlag)
        {
            return AOResultToServerResponse(await _friendService.UpdateFriendRequestAsync(AccountId, personId, eFriendRequestFlag));
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> DeleteFriendAsync(int personId)
        {
            return AOResultToServerResponse(await _friendService.DeleteFriendAsync(AccountId, personId));
        }
    }
}