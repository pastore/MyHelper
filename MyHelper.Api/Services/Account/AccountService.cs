using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.User;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Extensions;
using MyHelper.Api.Core.Helpers;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Services.Token;

namespace MyHelper.Api.Services.Account
{
    public class AccountService : BaseService, IAccountService
    {
        private readonly ITokenService _tokenService;

        public AccountService(MyHelperContext myHelperDbContext, IMapper mapper, ITokenService tokenService) : base(myHelperDbContext, mapper)
        {
            _tokenService = tokenService;
        }

        public async Task<AOResult<AuthorizationTokenResponse>> LoginAsync(LoginRequest request)
        {
            return await BaseInvokeAsync(async () =>
            {
                var appUser = await _myHelperDbContext.AppUsers
                    .FirstOrDefaultAsync(x => x.Username == request.Username);

                if (appUser == null || !HashPasswordHelper.Verify(appUser.Password, request.Password))
                    return AOBuilder.SetError<AuthorizationTokenResponse>("Username or password is incorrect");

                var tokenInfo = _tokenService.CreateToken(GetClaimsFromAppUser(appUser));

                var authorizationTokenResponse = new AuthorizationTokenResponse()
                {
                    Token = tokenInfo.Token,
                    ExpirationDate = tokenInfo.ExpiredDate,
                    AppUserViewModel = _mapper.Map<AppUser, AppUserViewModel>(appUser)
                };

                return AOBuilder.SetSuccess(authorizationTokenResponse);
            }, request);
        }

        public async Task<AOResult<AuthorizationTokenResponse>> RegisterAsync(RegistrationRequest request)
        {
            return await BaseInvokeAsync(async () =>
            {
                if (_myHelperDbContext.AppUsers.Any(x => x.Email == request.Email || x.Username == request.Username))
                    return AOBuilder.SetError<AuthorizationTokenResponse>(Constants.Errors.UserAlreadyRegistered);

                var appUser = new AppUser
                {
                    Username = request.Username,
                    Email = request.Email,
                    Password = HashPasswordHelper.Hash(request.Password),
                    UserRole = EUserRole.User,
                    CreatedDate = DateTime.Now
                };

                await _myHelperDbContext.AddAsync(appUser);
                await _myHelperDbContext.SaveChangesAsync();

                var tokenInfo = _tokenService.CreateToken(GetClaimsFromAppUser(appUser));

                var authorizationTokenResponse = new AuthorizationTokenResponse()
                {
                    Token = tokenInfo.Token,
                    ExpirationDate = tokenInfo.ExpiredDate,
                    AppUserViewModel = _mapper.Map<AppUser, AppUserViewModel>(appUser)
                };

                return AOBuilder.SetSuccess(authorizationTokenResponse);
            }, request);
        }

        #region -- private methods --

        private KeyValuePair<object, object>[] GetClaimsFromAppUser(AppUser appUser)
        {
            return new KeyValuePair<object, object>[]
            {
                new KeyValuePair<object, object>(ClaimTypes.Role, EUserRole.User.GetName()),
                new KeyValuePair<object, object>(ClaimTypes.Email, appUser.Email),
                new KeyValuePair<object, object>(ClaimTypes.Name, appUser.Username),
                new KeyValuePair<object, object>(ClaimTypes.NameIdentifier, appUser.Id)
            };
        }

        #endregion
    }
}
