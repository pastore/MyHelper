using MyHelper.Api.Models.Authentication;
using MyHelper.Api.Models.Response;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Accounts
{
    public interface IAccountService
    {
        Task<ServerResponse<AuthorizationTokenResponse>> LoginAsync(LoginRequest request);

        Task<ServerResponse<AuthorizationTokenResponse>> RegisterAsync(RegistrationRequest request);
    }
}
