using AutoMapper;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.User;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.User
{
    public class AppUserService : BaseService, IAppUserService
    {
        public AppUserService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<ServerResponse<List<AppUserViewModel>>> GetAppUsersAsync(int accountId, AppUserFilterRequest appUserFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = _myHelperDbContext.AppUsers
                    .Where(x => x.Id != accountId);

                query = FilterAppUsers(query, appUserFilterRequest);

                query = FetchItems(query, appUserFilterRequest);

                return ServerResponseBuilder.Build(await query.ToAsyncEnumerable().Select(x => _mapper.Map<AppUser, AppUserViewModel>(x)).ToList());
            });
        }

        #region -- Private methods -- 

        public IQueryable<AppUser> FilterAppUsers(IQueryable<AppUser> query, AppUserFilterRequest appUserFilterRequest)
        {
            if (!string.IsNullOrWhiteSpace(appUserFilterRequest.Search))
            {
                query = query.Where(x => x.Username.ToLower().Contains(appUserFilterRequest.Search.ToLower()));
            }
            return query;
        }

        #endregion
    }
}
