using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Core;
using MyHelper.Api.Models.Friends;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Friends;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/friends")]
    public class FriendsController : BaseController
    {
        private readonly IFriendService _friendService;

        public FriendsController(IFriendService friendService)
        {
            _friendService = friendService;
        }

        [HttpGet("search")]
        public async Task<ServerResponse<List<FriendViewModel>>> GetSearchFriendsAsync(FriendFilterRequest friendFilterRequest)
        {
            return await _friendService.GetSearchFriendsAsync(AccountId, friendFilterRequest);
        }

        [HttpGet("my")]
        public async Task<ServerResponse<List<FriendViewModel>>> GetMyFriendsAsync(FriendFilterRequest friendFilterRequest)
        {
            return await _friendService.GetFriendsByRequestFlag(AccountId, EFriendRequestFlag.Approved, friendFilterRequest);
        }

        [HttpGet("requests")]
        public async Task<ServerResponse<List<FriendViewModel>>> GetRequestsFriendsAsync(FriendFilterRequest friendFilterRequest)
        {
            return await _friendService.GetFriendsByRequestFlag(AccountId, EFriendRequestFlag.None, friendFilterRequest);
        }

        [HttpPost]
        public async Task<ServerResponse<bool>> InviteFriendAsync([FromBody]long personId)
        {
            return await _friendService.InviteFriendAsync(AccountId, personId);
        }

        [HttpPut]
        public async Task<ServerResponse<bool>> CancelFriendAsync([FromBody]long personId)
        {
            return await _friendService.CancelFriendAsync(AccountId, personId);
        }

        [HttpPatch("{personId}")]
        public async Task<ServerResponse<bool>> UpdateFriendRequestAsync(long personId, [FromBody] EFriendRequestFlag eFriendRequestFlag)
        {
            return await _friendService.UpdateFriendRequestAsync(AccountId, personId, eFriendRequestFlag);
        }

        [HttpDelete]
        public async Task<ServerResponse<bool>> DeleteFriendAsync(long personId)
        {
            return await _friendService.DeleteFriendAsync(AccountId, personId);
        }
    }
}