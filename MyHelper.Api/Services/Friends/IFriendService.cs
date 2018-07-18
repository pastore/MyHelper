using System.Collections.Generic;
using MyHelper.Api.Models.Response;
using System.Threading.Tasks;
using MyHelper.Api.Core;
using MyHelper.Api.Models.Friend;
using MyHelper.Api.Models.Request;

namespace MyHelper.Api.Services.Friends
{
    public interface IFriendService
    {
        Task<AOResult<List<FriendViewModel>>> GetSearchFriendsAsync(int accountId, FriendFilterRequest friendFilterRequest);

        Task<AOResult<List<FriendViewModel>>> GetFriendsByRequestFlag(int accountId, EFriendRequestFlag eFriendRequestFlag,
            FriendFilterRequest friendFilterRequest);

        Task<AOResult> InviteFriendAsync(int accountId, int personId);

        Task<AOResult> CancelFriendAsync(int accountId, int personId);

        Task<AOResult> UpdateFriendRequestAsync(int accountId, int personId, EFriendRequestFlag eFriendRequestFlag);

        Task<AOResult> DeleteFriendAsync(int accountId, int personId);
    }
}
