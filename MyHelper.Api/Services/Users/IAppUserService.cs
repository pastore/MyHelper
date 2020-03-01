using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Users;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Users
{
    public interface IAppUserService
    {
        Task<ServerResponse<PageResult<AppUserViewModel>>> GetAdminUsersByPageAsync(
           AdminTableFilterRequest adminTableFilterRequest);
    }
}
