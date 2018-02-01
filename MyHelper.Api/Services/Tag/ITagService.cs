using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;

namespace MyHelper.Api.Services.Tag
{
    public interface ITagService
    {
        Task<AOResult<List<TagResponse>>> GetTagsAsync();

        Task<AOResult> CreateTagAsync(TagRequest tagRequest);
    }
}
