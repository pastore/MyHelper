using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Account;

namespace MyHelper.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService appUserService)
        {
            _accountService = appUserService;
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(ServerResponse<AuthorizationTokenResponse>), 200)]
        public async Task<ServerResponse<AuthorizationTokenResponse>> LoginAsync([FromBody]LoginRequest request)
        {
            return AOResultToServerResponse(await _accountService.LoginAsync(request));
        }

        [HttpPost("registration")]
        [ProducesResponseType(typeof(ServerResponse<AuthorizationTokenResponse>), 200)]
        public async Task<ServerResponse<AuthorizationTokenResponse>> RegisterAsync([FromBody]RegistrationRequest request)
        {
            return AOResultToServerResponse(await _accountService.RegisterAsync(request));
        }
    }
}