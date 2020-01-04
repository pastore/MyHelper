using MyHelper.Api.Core;
using MyHelper.Api.Models.Friend;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Friends
{
    public interface IFriendService
    {
        Task<ServerResponse<List<FriendViewModel>>> GetSearchFriendsAsync(int accountId, FriendFilterRequest friendFilterRequest);

        Task<ServerResponse<List<FriendViewModel>>> GetFriendsByRequestFlag(int accountId, EFriendRequestFlag eFriendRequestFlag,
            FriendFilterRequest friendFilterRequest);

        Task<ServerResponse<bool>> InviteFriendAsync(int accountId, int personId);

        Task<ServerResponse<bool>> CancelFriendAsync(int accountId, int personId);

        Task<ServerResponse<bool>> UpdateFriendRequestAsync(int accountId, int personId, EFriendRequestFlag eFriendRequestFlag);

        Task<ServerResponse<bool>> DeleteFriendAsync(int accountId, int personId);
    }
}
