using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Tag
{
    public interface ITagAdminService
    {
        Task<ServerResponse<List<TagAdminResponse>>> GetAdminTagsAsync();
    }
}
