using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Tags;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Tags
{
    public interface ITagService
    {
        Task<ServerResponse<List<TagResponse>>> GetTagsAsync();

        Task<ServerResponse<List<TagResponse>>> GetTagsByIdsAsync(List<long> tagIds);

        Task<ServerResponse<bool>> CreateTagAsync(TagRequest tagRequest);

        Task<ServerResponse<PageResult<TagAdminResponse>>> GetAdminTagsByPageAsync(
            AdminTableFilterRequest adminTableFilterRequest);

        Task<ServerResponse<bool>> DeleteTagAsync(long id);

        Task<ServerResponse<bool>> UpdateTagAsync(TagRequest tagRequest);
    }
}
