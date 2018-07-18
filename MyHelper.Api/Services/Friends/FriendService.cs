using System;
using System.Collections.Generic;
using AutoMapper;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Response;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Extensions;
using MyHelper.Api.Models.Friend;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.User;

namespace MyHelper.Api.Services.Friends
{
    public class FriendService : BaseService, IFriendService
    {
        public FriendService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<AOResult<List<FriendViewModel>>> GetSearchFriendsAsync(int accountId, FriendFilterRequest friendFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friends = _myHelperDbContext.Friends
                    .Where(x => x.RequestedById == accountId || x.RequestedToId == accountId)
                    .Select(x => x.RequestedById == accountId ? x.RequestedToId : x.RequestedById);

                var searchFriends = _myHelperDbContext.AppUsers.Where(x => !friends.Contains(x.Id) && x.Id != accountId);

                searchFriends = FilterSearchFriends(searchFriends, friendFilterRequest);

                searchFriends = FetchItems(searchFriends, friendFilterRequest);

                return AOBuilder.SetSuccess(await searchFriends.ToAsyncEnumerable().Select(x => _mapper.Map<AppUser, FriendViewModel>(x)).ToList());
            });
        }

        public async Task<AOResult<List<FriendViewModel>>> GetFriendsByRequestFlag(int accountId, EFriendRequestFlag eFriendRequestFlag, FriendFilterRequest friendFilterRequest)
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

                friends = FetchItems(friends, friendFilterRequest);


                return AOBuilder.SetSuccess(friends.MapFriendsToViewModels(accountId));
            });
        }

        public async Task<AOResult> InviteFriendAsync(int accountId, int personId)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friend = _myHelperDbContext.Friends.FirstOrDefault(x =>
                    (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (friend == null)
                {
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

                    return AOBuilder.SetSuccess();
                }

                return AOBuilder.SetError(Constants.Errors.RequestsAlreadyExists);
            });
        }

        public async Task<AOResult> CancelFriendAsync(int accountId, int personId)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friend = _myHelperDbContext.Friends.FirstOrDefault(x =>
                    (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (friend != null)
                {
                    if (friend.FriendRequestFlag != EFriendRequestFlag.Approved)
                        return AOBuilder.SetError(Constants.Errors.FriendNotApproved);

                    friend.FriendRequestFlag = EFriendRequestFlag.None;
                    await _myHelperDbContext.SaveChangesAsync();

                    return AOBuilder.SetSuccess();
                }

                return AOBuilder.SetError(Constants.Errors.FriendNotExists);
            });
        }

        public async Task<AOResult> UpdateFriendRequestAsync(int accountId, int personId, EFriendRequestFlag eFriendRequestFlag)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friend = _myHelperDbContext.Friends.FirstOrDefault(x =>
                    (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (friend != null)
                {
                    if (friend.FriendRequestFlag == EFriendRequestFlag.Approved)
                        return AOBuilder.SetError(Constants.Errors.FriendAlreadyApproved);
                    if (friend.FriendRequestFlag == EFriendRequestFlag.Rejected)
                        return AOBuilder.SetError(Constants.Errors.FriendAlreadyRejected);
                    if (friend.FriendRequestFlag == EFriendRequestFlag.Blocked)
                        return AOBuilder.SetError(Constants.Errors.FriendAlreadyBlocked);
                    if (friend.FriendRequestFlag == EFriendRequestFlag.Spam)
                        return AOBuilder.SetError(Constants.Errors.FriendAlreadySpamed);

                    friend.FriendRequestFlag = eFriendRequestFlag;
                    if (eFriendRequestFlag == EFriendRequestFlag.Approved)
                    {
                        friend.BecameFriendsTime = DateTime.Now;
                    }
                    else
                    {
                        friend.BecameFriendsTime = null;
                    }

                    await _myHelperDbContext.SaveChangesAsync();

                    return AOBuilder.SetSuccess();
                }

                return AOBuilder.SetError(Constants.Errors.FriendNotExists);
            });
        }

        public async Task<AOResult> DeleteFriendAsync(int accountId, int personId)
        {
            return await BaseInvokeAsync(async () =>
            {
                var friends = _myHelperDbContext.Friends.Where(x =>
                    (x.RequestedById == accountId && x.RequestedToId == personId)
                    || (x.RequestedById == personId && x.RequestedToId == accountId));

                if (!friends.Any())
                    return AOBuilder.SetError(Constants.Errors.FriendNotExists);

                _myHelperDbContext.Friends.RemoveRange(friends);
                await _myHelperDbContext.SaveChangesAsync();

                return AOBuilder.SetSuccess();
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
