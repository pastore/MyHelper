using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.User
{
    public interface IAppUserService
    {
       Task<ServerResponse<List<AppUserViewModel>>> GetAppUsersAsync(int accountId, AppUserFilterRequest appUserFilterRequest);
    }
}
