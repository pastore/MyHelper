using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.User;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Feeds
{
    public class FeedService : BaseService, IFeedService
    {
        public FeedService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<AOResult<List<FeedResponse>>> GetFeedsAsync(int accountId)
        {
            return await BaseInvokeAsync(async () =>
            {
                var appUser = _myHelperDbContext.AppUsers
                    .Include(x => x.ReceievedFriendRequests)
                    .Include(x => x.SentFriendRequests)
                    .FirstOrDefault(x => x.Id == accountId);
                if (appUser == null)
                    return AOBuilder.SetError<List<FeedResponse>>(Constants.Errors.AppUserNotExists);

                var friendIds = appUser
                    .ReceievedFriendRequests.Where(x => x.FriendRequestFlag == EFriendRequestFlag.Approved).Select(x => x.RequestedById)
                    .Union(appUser.SentFriendRequests.Where(x => x.FriendRequestFlag == EFriendRequestFlag.Approved).Select(x => x.RequestedToId));

                var query = _myHelperDbContext.Feeds
                    .Where(x => friendIds.Contains(x.AppUserId))
                    .OrderByDescending(x => x.CreateDate)
                    .AsQueryable();

                return AOBuilder.SetSuccess(await query.ToAsyncEnumerable().Select(x => _mapper.Map<Feed, FeedResponse>(x)).ToList());
            });
        }

        public async Task<AOResult<long>> CreateFeedAsync(FeedMessage feedMessage)
        {
            return await BaseInvokeAsync(async () =>
            {
                var feed = _mapper.Map<FeedMessage, Feed>(feedMessage);

                var appUser = _myHelperDbContext.AppUsers
                    .FirstOrDefault(x => x.Id == feedMessage.AppUserId);
                if (appUser == null)
                    return AOBuilder.SetError<long>(Constants.Errors.AppUserNotExists);

                var appUserDataJson = JsonConvert.SerializeObject(_mapper.Map<AppUser, AppUserViewModel>(appUser));
                feed.AppUserData = appUserDataJson;

                await _myHelperDbContext.Feeds.AddAsync(feed);
                await _myHelperDbContext.SaveChangesAsync();

                return AOBuilder.SetSuccess(feed.Id);
            });
        }
    }
}
