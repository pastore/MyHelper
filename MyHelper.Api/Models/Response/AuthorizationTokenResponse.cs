using System;
using MyHelper.Api.Models.User;

namespace MyHelper.Api.Models.Response
{
    public class AuthorizationTokenResponse
    {
        public string Token { get; set; }

        public DateTime ExpirationDate { get; set; }

        public AppUserViewModel AppUserViewModel { get; set; }
    }
}
