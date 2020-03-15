using MyHelper.Api.Models.Authentication;
using System.Collections.Generic;

namespace MyHelper.Api.Services.Token
{
    public interface ITokenService
    {
        TokenInfo CreateToken(IEnumerable<KeyValuePair<object, object>> claims);
    }
}
