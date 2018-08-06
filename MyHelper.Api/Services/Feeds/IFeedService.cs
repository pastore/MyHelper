using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Feeds
{
    public interface IFeedService
    {
        Task<AOResult<List<FeedResponse>>> GetFeedsAsync(int accountId);

        Task<AOResult<long>> CreateFeedAsync(FeedMessage feedMessage);
    }
}
