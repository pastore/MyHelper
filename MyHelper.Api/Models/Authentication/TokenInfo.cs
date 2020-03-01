using System;

namespace MyHelper.Api.Models.Authentication
{
    public class TokenInfo
    {
        public string Token { get; set; }

        public DateTime ExpiredDate { get; set; }
    }
}
