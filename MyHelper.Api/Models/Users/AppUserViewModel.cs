using System;
using MyHelper.Api.Core;

namespace MyHelper.Api.Models.Users
{
    public class AppUserViewModel
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Avatar { get; set; }

        public EUserRole UserRole { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
