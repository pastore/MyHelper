using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Exceptions;
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
        private readonly TokenValidationParameters _tokenValidationParameters;

        public TokenService(IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions;
            _tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = _authOptions.Value.Issuer,
                ValidateAudience = true,
                ValidAudience = _authOptions.Value.Audience,
                ValidateLifetime = true,
                IssuerSigningKey = GetSymmetricSecurityKey(),
                ValidateIssuerSigningKey = true,
            };
        }

        public TokenInfo CreateToken(IEnumerable<KeyValuePair<object, object>> claims)
        {
            var keyValuePairs = claims as KeyValuePair<object, object>[] ?? claims.ToArray();
            IEnumerable<KeyValuePair<object, object>> filteredClaims = keyValuePairs.Where(x => x.Key != null && x.Value != null);

            DateTime now = DateTime.Now;
            DateTime expires = now.Add(TimeSpan.FromMinutes(_authOptions.Value.MinutesLifetime));

            var jwtSecurityToken = new JwtSecurityToken(
                _authOptions.Value.Issuer,
                _authOptions.Value.Audience,
                notBefore: now,
                claims: filteredClaims.Any() ? keyValuePairs.Select(x => new Claim(x.Key.ToString(), x.Value.ToString())) : null,
                expires: expires,
                signingCredentials: new SigningCredentials(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new TokenInfo() { Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken), ExpiredDate = expires };
        }

        public IEnumerable<Claim> GetClaims(string token)
        {
            if (token == null || !IsTokenValid(token.Replace("Bearer ", string.Empty)))
                throw new UnauthorizedException(Constants.Errors.TokenIsInvalid);

            var handler = new JwtSecurityTokenHandler();

            if (!(handler.ReadToken(token.Replace("Bearer ", string.Empty)) is JwtSecurityToken jwtSecurityToken))
                return Enumerable.Empty<Claim>();

            return jwtSecurityToken.Claims;
        }

        public TokenValidationParameters GetTokenValidationParameters()
        {
            return _tokenValidationParameters;
        }

        private bool IsTokenValid(string token)
        {
            var handler = new JwtSecurityTokenHandler();

            handler.ValidateToken(token, _tokenValidationParameters, out SecurityToken securityKey);

            return securityKey != null;
        }

        private  SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_authOptions.Value.Key));
        }
    }
}
