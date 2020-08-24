using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Feeds.Context;
using MyHelper.Api.Feeds.Entities;
using MyHelper.Api.Models.Feeds;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MyHelper.Api.Feeds.Services
{
    public class CosmosDbService : BaseService<CosmosDbContext>, ICosmosDbService<Feed>
    {
        public CosmosDbService(CosmosDbContext cosmosDbContext, IMapper mapper) : base(cosmosDbContext, mapper)
        {
        }

        public async Task<ServerResponse<List<FeedResponse>>> GetFeedsAsync(long appUserId,
            FeedFilterRequest feedFilterRequest, Expression<Func<Feed, bool>> accessPredicate)
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = DbContext.Feeds
                    .AsQueryable()
                    .Where(x => x.AppUserId == appUserId.ToString())
                    .Where(accessPredicate)
                    .AsEnumerable();

                query = FilterFeeds(query, feedFilterRequest);

                query = query.OrderByDescending(x => x.CreateDate);

                if (feedFilterRequest.Offset.HasValue)
                {
                    query = query.Skip(feedFilterRequest.Offset.Value);
                }

                if (feedFilterRequest.Limit.HasValue)
                {
                    query = query.Take(feedFilterRequest.Limit.Value);
                }
                                           
                return ServerResponseBuilder.Build(await query.ToAsyncEnumerable()
                    .Select(x => Mapper.Map<Feed, FeedResponse>(x))
                    .ToListAsync());
            });
        }

        public async Task<ServerResponse<bool>> CreateFeedAsync(Feed entity)
        {
            return await BaseInvokeWithTryCatchAsync(async () =>
            {
                entity.Id = Guid.NewGuid();
                entity.CreateDate = DateTime.Now;
                entity.LastModifiedDate = entity.CreateDate;
                await DbContext.Feeds.AddAsync(entity);

                return ServerResponseBuilder.Build(true);
            });
        }

        public async Task<ServerResponse<bool>> UpdateFeedAsync(Feed entity)
        {
            return await BaseInvokeWithTryCatchAsync(async () =>
            {
                var feed = await DbContext.Feeds
                    .AsQueryable()
                    .FirstOrDefaultAsync(x =>
                        x.AppUserId == entity.AppUserId && x.FeedId == entity.FeedId);

                feed.FeedData = entity.FeedData;
                feed.LastModifiedDate = DateTime.Now;

                DbContext.Feeds.Update(feed);

                return ServerResponseBuilder.Build(true);
            });
        }

        public async Task<ServerResponse<bool>> DeleteFeedAsync(Feed entity)
        {
            return await BaseInvokeWithTryCatchAsync(async () =>
            {
                var feed = await DbContext.Feeds
                    .AsQueryable()
                    .FirstOrDefaultAsync(x =>
                        x.AppUserId == entity.AppUserId && x.FeedId == entity.FeedId);

                DbContext.Feeds.Remove(feed);

                return await Task.FromResult(ServerResponseBuilder.Build(true));
            });
        }

        public async Task<int> SaveAsync()
        {
            return await DbContext.SaveChangesAsync();
        }

        #region -- Private methods --

        private IEnumerable<Feed> FilterFeeds(IEnumerable<Feed> query, FeedFilterRequest feedFilterRequest)
        {
            if (feedFilterRequest.TagIds.Any())
            {
                query = query.Where(x => x.Tags.Any(tag => feedFilterRequest.TagIds.Any(t => t == tag.Id)));
            }

            return query;
        }

        #endregion
    }
}