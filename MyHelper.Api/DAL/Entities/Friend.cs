using MyHelper.Api.Core;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyHelper.Api.DAL.Entities
{
    public class Friend
    {
        [Column(Order = 0)]
        public int RequestedById { get; set; }

        [Column(Order = 1)]
        public int RequestedToId { get; set; }

        public virtual AppUser RequestedBy { get; set; }

        public virtual AppUser RequestedTo { get; set; }

        public DateTime? RequestTime { get; set; }

        public DateTime? BecameFriendsTime { get; set; }

        public EFriendRequestFlag FriendRequestFlag { get; set; } = EFriendRequestFlag.None;
    }
}
