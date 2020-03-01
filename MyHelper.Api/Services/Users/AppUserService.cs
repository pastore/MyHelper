using AutoMapper;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Users;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Users
{
    public class AppUserService : BaseService, IAppUserService
    {
        public AppUserService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<ServerResponse<PageResult<AppUserViewModel>>> GetAdminUsersByPageAsync(AdminTableFilterRequest adminTableFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = _myHelperDbContext.AppUsers.AsQueryable();

                query = FilterAppUsers(query, adminTableFilterRequest);

                var usersCount = query.Count();

                query = SortItems(query, adminTableFilterRequest);

                query = FetchItems(query, adminTableFilterRequest);

                var pageResult = new PageResult<AppUserViewModel>
                {
                    Items = query.Select(x => new AppUserViewModel
                    {
                        Id = x.Id,
                        UserName = x.Username,
                        UserRole = x.UserRole,
                        CreatedDate = x.CreatedDate,
                        Email = x.Email
                    }).ToList(),
                    TotalCount = usersCount
                };

                return ServerResponseBuilder.Build(await Task.FromResult(pageResult));
            });
        }

        #region -- Private methods -- 

        public IQueryable<AppUser> FilterAppUsers(IQueryable<AppUser> query, AdminTableFilterRequest adminTableFilterRequest)
        {
            if (!string.IsNullOrWhiteSpace(adminTableFilterRequest.Search))
            {
                query = query.Where(x => x.Username.ToLower().Contains(adminTableFilterRequest.Search.ToLower()));
            }
            return query;
        }

        #endregion
    }
}
