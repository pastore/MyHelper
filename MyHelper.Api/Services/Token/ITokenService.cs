using Microsoft.IdentityModel.Tokens;
using MyHelper.Api.Models.Authentication;
using System.Collections.Generic;
using System.Security.Claims;

namespace MyHelper.Api.Services.Token
{
    public interface ITokenService
    {
        TokenInfo CreateToken(IEnumerable<KeyValuePair<object, object>> claims);

        IEnumerable<Claim> GetClaims(string token);

        TokenValidationParameters GetTokenValidationParameters();
    }
}
