using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Core;
using MyHelper.Api.Models.User;

namespace MyHelper.Api.Models.Friend
{
    public class FriendViewModel : AppUserViewModel
    {
        public EFriendRequestDirection FriendRequestDirection { get; set; }

        public EFriendRequestFlag FriendRequestFlag { get; set; }
    }
}
