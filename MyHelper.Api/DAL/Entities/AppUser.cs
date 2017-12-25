using System.Collections.Generic;
using MyHelper.Api.Core;

namespace MyHelper.Api.DAL.Entities
{
    public class AppUser
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Avatar { get; set; }

        public ERole Role { get; set; }

        // Reverse navigation
        public ICollection<Friend> SentFriendRequests { get; set; }

        public ICollection<Friend> ReceievedFriendRequests { get; set; }

        public ICollection<MhTask> MhTasks { get; set; }

        public ICollection<Note> Notes { get; set; }
    }
}
