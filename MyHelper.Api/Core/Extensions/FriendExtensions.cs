using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Friends;
using System.Collections.Generic;
using System.Linq;

namespace MyHelper.Api.Core.Extensions
{
    public static class FriendExtensions
    {
        public static List<FriendViewModel> MapFriendsToViewModels(this IQueryable<Friend> source, long accountId)
        {

            return source
                .Select(x => accountId == x.RequestedById
                ? new FriendViewModel
                {
                    Id = x.RequestedTo.Id,
                    UserName = x.RequestedTo.Username,
                    UserRole = x.RequestedTo.UserRole,
                    FriendRequestDirection = EFriendRequestDirection.ByMe,
                    FriendRequestFlag = x.FriendRequestFlag
                }
                : new FriendViewModel
                {
                    Id = x.RequestedBy.Id,
                    UserName = x.RequestedBy.Username,
                    UserRole = x.RequestedBy.UserRole,
                    FriendRequestDirection = EFriendRequestDirection.ToMe,
                    FriendRequestFlag = x.FriendRequestFlag
                })
                .ToList();
        }
    }
}
