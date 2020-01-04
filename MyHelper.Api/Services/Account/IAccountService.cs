using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Account
{
    public interface IAccountService
    {
        Task<ServerResponse<AuthorizationTokenResponse>> LoginAsync(LoginRequest request);

        Task<ServerResponse<AuthorizationTokenResponse>> RegisterAsync(RegistrationRequest request);
    }
}
