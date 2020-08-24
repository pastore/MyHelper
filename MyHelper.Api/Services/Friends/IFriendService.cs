using MyHelper.Api.Core;
using MyHelper.Api.Models.Friends;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Friends
{
    public interface IFriendService
    {
        Task<ServerResponse<List<long>>> GetFriendIds(long appUserId);

        Task<ServerResponse<List<FriendViewModel>>> GetSearchFriendsAsync(long accountId, FriendFilterRequest friendFilterRequest);

        Task<ServerResponse<List<FriendViewModel>>> GetFriendsByRequestFlag(long accountId, EFriendRequestFlag eFriendRequestFlag,
            FriendFilterRequest friendFilterRequest);

        Task<ServerResponse<bool>> InviteFriendAsync(long accountId, long personId);

        Task<ServerResponse<bool>> CancelFriendAsync(long accountId, long personId);

        Task<ServerResponse<bool>> UpdateFriendRequestAsync(long accountId, long personId, EFriendRequestFlag eFriendRequestFlag);

        Task<ServerResponse<bool>> DeleteFriendAsync(long accountId, long personId);
    }
}
