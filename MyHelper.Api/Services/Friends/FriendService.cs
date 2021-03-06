﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Exceptions;
using MyHelper.Api.Core.Extensions;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Friends;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Friends
{
    public class FriendService : BaseService<MyHelperContext>, IFriendService
    {
        public FriendService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<ServerResponse<List<long>>> GetFriendIds(long appUserId)
        {
            return await BaseInvokeWithTryCatchAsync(async () =>
            {
                var friendIds = DbContext.Friends
                    .AsQueryable()
                    .Where(x => x.FriendRequestFlag == EFriendRequestFlag.Approved 
                        && (x.RequestedById == appUserId || x.RequestedToId == appUserId))
                    .Select(x => x.RequestedById == appUserId ? x.RequestedToId : x.RequestedById);

                return ServerResponseBuilder.Build(await friendIds.ToListAsync());
            });
        }

        public async Task<ServerResponse<List<FriendViewModel>>> GetSearchFriendsAsync(long accountId, FriendFilterRequest friendFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friends = DbContext.Friends
                    .AsQueryable()
                    .Where(x => x.RequestedById == accountId || x.RequestedToId == accountId)
                    .Select(x => x.RequestedById == accountId ? x.RequestedToId : x.RequestedById);

                var searchFriends = DbContext.AppUsers
                    .AsQueryable()
                    .Where(x => !friends.Contains(x.Id) && x.Id != accountId);

                searchFriends = FilterSearchFriends(searchFriends, friendFilterRequest);

                searchFriends = searchFriends.OrderByDescending(x => x.CreatedDate);

                searchFriends = FetchItems(searchFriends, friendFilterRequest);

                return ServerResponseBuilder.Build(await searchFriends.ToAsyncEnumerable()
                    .Select(x => Mapper.Map<AppUser, FriendViewModel>(x)).ToListAsync());
            });
        }

        public async Task<ServerResponse<List<FriendViewModel>>> GetFriendsByRequestFlag(
            long accountId, EFriendRequestFlag eFriendRequestFlag, FriendFilterRequest friendFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friends = DbContext.Friends
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

        public async Task<ServerResponse<bool>> InviteFriendAsync(long accountId, long personId)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friend = DbContext.Friends.FirstOrDefault(x =>
                    (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (friend != null)
                    throw new ConflictException(Constants.Errors.RequestsAlreadyExists);
                
                var appUser = DbContext.AppUsers.First(x => x.Id == accountId);
                var person = DbContext.AppUsers.First(x => x.Id == personId);

                friend = new Friend
                {
                    RequestedBy = appUser,
                    RequestedTo = person,
                    FriendRequestFlag = EFriendRequestFlag.None,
                    RequestTime = DateTime.Now
                };

                await DbContext.Friends.AddAsync(friend);
                await DbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            });
        }

        public async Task<ServerResponse<bool>> CancelFriendAsync(long accountId, long personId)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friend = DbContext.Friends.FirstOrDefault(x =>
                    (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (friend == null)
                    throw new NotFoundException(Constants.Errors.FriendNotExists);

                if (friend.FriendRequestFlag != EFriendRequestFlag.Approved)
                    throw new ConflictException(Constants.Errors.FriendNotApproved);

                friend.FriendRequestFlag = EFriendRequestFlag.None;
                await DbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            });
        }

        public async Task<ServerResponse<bool>> UpdateFriendRequestAsync(long accountId, long personId, EFriendRequestFlag eFriendRequestFlag)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friend = DbContext.Friends.FirstOrDefault(x =>
                    (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (friend == null)
                    throw new NotFoundException(Constants.Errors.FriendNotExists);

                if (Constants.FriendRequestFlagsWithErrors.ContainsKey(friend.FriendRequestFlag))
                    throw new ConflictException(Constants.FriendRequestFlagsWithErrors[friend.FriendRequestFlag]);

                friend.FriendRequestFlag = eFriendRequestFlag;
                friend.BecameFriendsTime = eFriendRequestFlag == EFriendRequestFlag.Approved ? (DateTime?)DateTime.Now : null;

                await DbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            });
        }

        public async Task<ServerResponse<bool>> DeleteFriendAsync(long accountId, long personId)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friends = DbContext.Friends
                    .AsQueryable()
                    .Where(x => (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (!friends.Any())
                    throw new NotFoundException(Constants.Errors.FriendNotExists);

                DbContext.Friends.RemoveRange(friends);
                await DbContext.SaveChangesAsync();

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

        public IQueryable<Friend> FilterFriends(IQueryable<Friend> query, long accountId, FriendFilterRequest friendFilterRequest)
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
