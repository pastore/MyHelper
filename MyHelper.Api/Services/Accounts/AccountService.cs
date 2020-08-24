using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Exceptions;
using MyHelper.Api.Core.Extensions;
using MyHelper.Api.Core.Helpers;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Authentication;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Users;
using MyHelper.Api.Services.Token;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Accounts
{
    public class AccountService : BaseService<MyHelperContext>, IAccountService
    {
        private readonly ITokenService _tokenService;

        public AccountService(MyHelperContext myHelperDbContext, IMapper mapper, ITokenService tokenService) : base(myHelperDbContext, mapper)
        {
            _tokenService = tokenService;
        }

        public async Task<ServerResponse<AuthorizationTokenResponse>> LoginAsync(LoginRequest request)
        {
            return await BaseInvokeAsync(async () =>
            {
                var appUser = await DbContext.AppUsers
                    .AsQueryable()
                    .FirstOrDefaultAsync(x => x.Username == request.UserName);

                if (appUser == null)
                    throw new UnauthorizedException(Constants.Errors.UsernameIsIncorrect);
                if (!HashPasswordHelper.Verify(appUser.Password, request.Password))
                    throw new UnauthorizedException(Constants.Errors.PasswordIsIncorrect);

                var tokenInfo = _tokenService.CreateToken(GetClaimsFromAppUser(appUser));

                var authorizationTokenResponse = new AuthorizationTokenResponse()
                {
                    Token = tokenInfo.Token,
                    ExpirationDate = tokenInfo.ExpiredDate,
                    AppUserViewModel = Mapper.Map<AppUser, AppUserViewModel>(appUser)
                };

                return ServerResponseBuilder.Build(authorizationTokenResponse);
            }, request);
        }

        public async Task<ServerResponse<AuthorizationTokenResponse>> RegisterAsync(RegistrationRequest request)
        {
            return await BaseInvokeAsync(async () =>
            {
                if (DbContext.AppUsers.Any(x => x.Email == request.Email || x.Username == request.UserName))
                    throw new UnauthorizedException(Constants.Errors.UserAlreadyRegistered);

                var appUser = new AppUser
                {
                    Username = request.UserName,
                    Email = request.Email,
                    Password = HashPasswordHelper.Hash(request.Password),
                    UserRole = EUserRole.User,
                    CreatedDate = DateTime.Now
                };

                await DbContext.AddAsync(appUser);
                await DbContext.SaveChangesAsync();

                var tokenInfo = _tokenService.CreateToken(GetClaimsFromAppUser(appUser));

                var authorizationTokenResponse = new AuthorizationTokenResponse()
                {
                    Token = tokenInfo.Token,
                    ExpirationDate = tokenInfo.ExpiredDate,
                    AppUserViewModel = Mapper.Map<AppUser, AppUserViewModel>(appUser)
                };

                return ServerResponseBuilder.Build(authorizationTokenResponse);
            }, request);
        }

        #region -- Private methods --

        private KeyValuePair<object, object>[] GetClaimsFromAppUser(AppUser appUser)
        {
            return new[]
            {
                new KeyValuePair<object, object>(ClaimTypes.Role, appUser.UserRole.GetName()),
                new KeyValuePair<object, object>(ClaimTypes.Email, appUser.Email),
                new KeyValuePair<object, object>(ClaimTypes.Name, appUser.Username),
                new KeyValuePair<object, object>(ClaimTypes.NameIdentifier, appUser.Id)
            };
        }

        #endregion
    }
}
