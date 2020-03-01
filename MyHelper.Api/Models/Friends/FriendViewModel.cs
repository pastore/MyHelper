using MyHelper.Api.Core;
using MyHelper.Api.Models.Users;

namespace MyHelper.Api.Models.Friends
{
    public class FriendViewModel : AppUserViewModel
    {
        public EFriendRequestDirection FriendRequestDirection { get; set; }

        public EFriendRequestFlag FriendRequestFlag { get; set; }
    }
}
