using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Account;
using MyHelper.Api.Services.Token;

namespace MyHelper.Api.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}")]
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService appUserService, ITokenService tokenService) : base(tokenService)
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