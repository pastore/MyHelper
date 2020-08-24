using MyHelper.Api.Feeds.Entities;
using MyHelper.Api.Models.Feeds;
using MyHelper.Api.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MyHelper.Api.Feeds.Services
{
    public interface ICosmosDbService<in TEntity> where TEntity: class
    {
        Task<ServerResponse<List<FeedResponse>>> GetFeedsAsync(long appUserId, FeedFilterRequest feedFilterRequest, Expression<Func<Feed, bool>> accessPredicate);

        Task<ServerResponse<bool>> CreateFeedAsync(TEntity entity);

        Task<ServerResponse<bool>> UpdateFeedAsync(TEntity entity);

        Task<ServerResponse<bool>> DeleteFeedAsync(TEntity entity);

        Task<int> SaveAsync();
    }
}
