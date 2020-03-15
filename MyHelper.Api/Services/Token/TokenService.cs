using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyHelper.Api.Models.Authentication;
using MyHelper.Api.Models.Options;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace MyHelper.Api.Services.Token
{
    public class TokenService : ITokenService
    {
        private readonly IOptions<AuthOptions> _authOptions;

        public TokenService(IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions;
        }

        public TokenInfo CreateToken(IEnumerable<KeyValuePair<object, object>> claims)
        {
            var keyValuePairs = claims as KeyValuePair<object, object>[] ?? claims.ToArray();
            var filteredClaims = keyValuePairs.Where(x => x.Key != null && x.Value != null);

            var now = DateTime.Now;
            var expires = now.Add(TimeSpan.FromMinutes(_authOptions.Value.MinutesLifetime));

            var jwtSecurityToken = new JwtSecurityToken(
                _authOptions.Value.Issuer,
                _authOptions.Value.Audience,
                notBefore: now,
                claims: filteredClaims.Any() ? keyValuePairs.Select(x => new Claim(x.Key.ToString(), x.Value.ToString())) : null,
                expires: expires,
                signingCredentials: new SigningCredentials(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new TokenInfo() { Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken), ExpiredDate = expires };
        }

        private SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_authOptions.Value.Key));
        }
    }
}
