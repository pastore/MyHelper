using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyHelper.Api.Models.Token;
using MyHelper.Api.Models.Options;

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

        /// <summary>
        /// Creates the token.
        /// </summary>
        /// <returns>The token.</returns>
        /// <param name="claims">Claims.</param>
        public TokenInfo CreateToken(IEnumerable<KeyValuePair<object, object>> claims)
        {
            var keyValuePairs = claims as KeyValuePair<object, object>[] ?? claims.ToArray();
            IEnumerable<KeyValuePair<object, object>> filteredClaims = keyValuePairs.Where(x => x.Key != null && x.Value != null);

            DateTime now = DateTime.Now;
            DateTime expires = now.Add(TimeSpan.FromDays(_authOptions.Value.MinutesLifetime));

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _authOptions.Value.Issuer,
                audience: _authOptions.Value.Audience,
                notBefore: now,
                claims: filteredClaims.Any() ? keyValuePairs.Select(x => new Claim(x.Key.ToString(), x.Value.ToString())) : null,
                expires: expires,
                signingCredentials: new SigningCredentials(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new TokenInfo() { Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken), ExpiredDate = expires };
        }

        /// <summary>
        /// Gets the claims.
        /// </summary>
        /// <returns>The claims.</returns>
        /// <param name="token">Token.</param>
        public IEnumerable<Claim> GetClaims(string token)
        {
            if (token == null)
                throw new ArgumentNullException(nameof(token));

            if (!IsTokenValid(token))
                throw new Exception("Token is invalid");

            var handler = new JwtSecurityTokenHandler();

            if (!(handler.ReadToken(token.Replace("Bearer ", string.Empty)) is JwtSecurityToken jwtSecurityToken))
                return Enumerable.Empty<Claim>();

            return jwtSecurityToken.Claims;
        }

        /// <summary>
        /// Determines whether the token valid.
        /// </summary>
        /// <returns><c>true</c>, if token is valid, <c>false</c> otherwise.</returns>
        /// <param name="token">Token.</param>
        public bool IsTokenValid(string token)
        {
            var handler = new JwtSecurityTokenHandler();

            handler.ValidateToken(token, _tokenValidationParameters, out SecurityToken securityKey);

            return securityKey != null;
        }

        public TokenValidationParameters GetTokenValidationParameters()
        {
            return _tokenValidationParameters;
        }

        public  SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_authOptions.Value.Key));
        }
    }
}
