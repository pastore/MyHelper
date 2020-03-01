using System;
using MyHelper.Api.Models.Users;

namespace MyHelper.Api.Models.Authentication
{
    public class AuthorizationTokenResponse
    {
        public string Token { get; set; }

        public DateTime ExpirationDate { get; set; }

        public AppUserViewModel AppUserViewModel { get; set; }
    }
}
