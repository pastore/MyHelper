using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace MyHelper.Api.Controllers
{
    public abstract class BaseController: Controller
    {
        protected long AccountId
        {
            get
            {
                Claim accountClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

                if (accountClaim == null || !long.TryParse(accountClaim.Value, out long accountId))
                    return 0;

                return accountId;
            }
        }
    }
}
