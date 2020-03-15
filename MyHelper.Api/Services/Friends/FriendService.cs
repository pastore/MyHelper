using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Exceptions;
using MyHelper.Api.Core.Extensions;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Friends;
using MyHelper.Api.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Friends
{
    public class FriendService : BaseService, IFriendService
    {
        public FriendService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<ServerResponse<List<FriendViewModel>>> GetSearchFriendsAsync(int accountId, FriendFilterRequest friendFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friends = _myHelperDbContext.Friends
                    .AsQueryable()
                    .Where(x => x.RequestedById == accountId || x.RequestedToId == accountId)
                    .Select(x => x.RequestedById == accountId ? x.RequestedToId : x.RequestedById);

                var searchFriends = _myHelperDbContext.AppUsers
                    .AsQueryable()
                    .Where(x => !friends.Contains(x.Id) && x.Id != accountId);

                searchFriends = FilterSearchFriends(searchFriends, friendFilterRequest);

                searchFriends = searchFriends.OrderByDescending(x => x.CreatedDate);

                searchFriends = FetchItems(searchFriends, friendFilterRequest);

                return ServerResponseBuilder.Build(await searchFriends.ToAsyncEnumerable()
                    .Select(x => _mapper.Map<AppUser, FriendViewModel>(x)).ToListAsync());
            });
        }

        public async Task<ServerResponse<List<FriendViewModel>>> GetFriendsByRequestFlag(
            int accountId, EFriendRequestFlag eFriendRequestFlag, FriendFilterRequest friendFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friends = _myHelperDbContext.Friends
                    .Include(x => x.RequestedBy)
                    .Include(x => x.RequestedTo)
                    .Where(x =>
                        (x.RequestedById == accountId || x.RequestedToId == accountId)
                        && x.FriendRequestFlag == eFriendRequestFlag);

                friends = FilterFriends(friends, accountId, friendFilterRequest);

                friends = friends.OrderByDescending(x => x.RequestTime);

                friends = FetchItems(friends, friendFilterRequest);

                return await Task.FromResult(ServerResponseBuilder.Build(friends.MapFriendsToViewModels(accountId)));
            });
        }

        public async Task<ServerResponse<bool>> InviteFriendAsync(int accountId, int personId)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friend = _myHelperDbContext.Friends.FirstOrDefault(x =>
                    (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (friend != null)
                    throw new ConflictException(Constants.Errors.RequestsAlreadyExists);
                
                var appUser = _myHelperDbContext.AppUsers.First(x => x.Id == accountId);
                var person = _myHelperDbContext.AppUsers.First(x => x.Id == personId);

                friend = new Friend
                {
                    RequestedBy = appUser,
                    RequestedTo = person,
                    FriendRequestFlag = EFriendRequestFlag.None,
                    RequestTime = DateTime.Now
                };

                await _myHelperDbContext.Friends.AddAsync(friend);
                await _myHelperDbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            });
        }

        public async Task<ServerResponse<bool>> CancelFriendAsync(int accountId, int personId)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friend = _myHelperDbContext.Friends.FirstOrDefault(x =>
                    (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (friend == null)
                    throw new NotFoundException(Constants.Errors.FriendNotExists);

                if (friend.FriendRequestFlag != EFriendRequestFlag.Approved)
                    throw new ConflictException(Constants.Errors.FriendNotApproved);

                friend.FriendRequestFlag = EFriendRequestFlag.None;
                await _myHelperDbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            });
        }

        public async Task<ServerResponse<bool>> UpdateFriendRequestAsync(int accountId, int personId, EFriendRequestFlag eFriendRequestFlag)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friend = _myHelperDbContext.Friends.FirstOrDefault(x =>
                    (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (friend == null)
                    throw new NotFoundException(Constants.Errors.FriendNotExists);

                if (Constants.FriendRequestFlagsWithErrors.ContainsKey(friend.FriendRequestFlag))
                    throw new ConflictException(Constants.FriendRequestFlagsWithErrors[friend.FriendRequestFlag]);

                friend.FriendRequestFlag = eFriendRequestFlag;
                friend.BecameFriendsTime = eFriendRequestFlag == EFriendRequestFlag.Approved ? (DateTime?)DateTime.Now : null;

                await _myHelperDbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            });
        }

        public async Task<ServerResponse<bool>> DeleteFriendAsync(int accountId, int personId)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friends = _myHelperDbContext.Friends
                    .AsQueryable()
                    .Where(x => (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (!friends.Any())
                    throw new NotFoundException(Constants.Errors.FriendNotExists);

                _myHelperDbContext.Friends.RemoveRange(friends);
                await _myHelperDbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            });
        }

        #region -- Private methods --

        public IQueryable<AppUser> FilterSearchFriends(IQueryable<AppUser> query, FriendFilterRequest friendFilterRequest)
        {
            if (!string.IsNullOrWhiteSpace(friendFilterRequest.Search))
            {
                query = query.Where(x => x.Username.ToLower().Contains(friendFilterRequest.Search.ToLower()));
            }
            return query;
        }

        public IQueryable<Friend> FilterFriends(IQueryable<Friend> query, int accountId, FriendFilterRequest friendFilterRequest)
        {
            if (!string.IsNullOrWhiteSpace(friendFilterRequest.Search))
            {
                query = query.Where(x => x.RequestedById == accountId 
                    ? x.RequestedTo.Username.ToLower().Contains(friendFilterRequest.Search.ToLower())
                    : x.RequestedBy.Username.ToLower().Contains(friendFilterRequest.Search.ToLower()));
            }
            return query;
        }

        #endregion
    }
}
