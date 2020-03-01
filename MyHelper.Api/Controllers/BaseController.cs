using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Services.Token;
using System.Linq;
using System.Security.Claims;

namespace MyHelper.Api.Controllers
{
    public abstract class BaseController: Controller
    {
        private readonly ITokenService _tokenService;

        protected BaseController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        protected int AccountId
        {
            get
            {
                Claim accountClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

                if (accountClaim == null || !int.TryParse(accountClaim.Value, out int accountId))
                    return 0;

                return accountId;
            }
        }
    }
}
