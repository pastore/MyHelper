using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Security.Claims;
using MyHelper.Api.Models.Token;

namespace MyHelper.Api.Services.Token
{
    public interface ITokenService
    {
        TokenInfo CreateToken(IEnumerable<KeyValuePair<object, object>> claims);

        IEnumerable<Claim> GetClaims(string token);

        bool IsTokenValid(string token);

        SymmetricSecurityKey GetSymmetricSecurityKey();

        TokenValidationParameters GetTokenValidationParameters();
    }
}
