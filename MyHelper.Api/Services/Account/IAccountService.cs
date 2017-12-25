using System.Threading.Tasks;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.User;

namespace MyHelper.Api.Services.Account
{
    public interface IAccountService
    {
        Task<AOResult<AuthorizationTokenResponse>> LoginAsync(LoginRequest request);

        Task<AOResult<AuthorizationTokenResponse>> RegisterAsync(RegisterRequest request);
    }
}
