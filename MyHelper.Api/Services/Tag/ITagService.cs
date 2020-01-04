using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Tag
{
    public interface ITagService
    {
        Task<ServerResponse<List<TagResponse>>> GetTagsAsync();

        Task<ServerResponse<bool>> CreateTagAsync(TagRequest tagRequest);
    }
}
