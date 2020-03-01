using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Users;
using MyHelper.Api.Services.Users;
using System.Threading.Tasks;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/users")]
    public class AppUsersController : BaseController
    {
        private readonly IAppUserService _appUserService;

        public AppUsersController(IAppUserService appUserService)
        {
            _appUserService = appUserService;
        }

        [Authorize(Policy = "Admin")]
        [Route("admin")]
        [HttpGet]
        public async Task<ServerResponse<PageResult<AppUserViewModel>>> GetAdminTagsByPageAsync(AdminTableFilterRequest adminTableFilterRequest)
        {
            return await _appUserService.GetAdminUsersByPageAsync(adminTableFilterRequest);
        }
    }
}