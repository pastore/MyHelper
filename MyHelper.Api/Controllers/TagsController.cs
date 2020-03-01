using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Tags;
using MyHelper.Api.Services.Tags;
using MyHelper.Api.Services.Token;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/tags")]
    public class TagsController : BaseController
    {
        private readonly ITagService _tagService;

        public TagsController(ITagService tagService, ITokenService tokenService) : base(tokenService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<ServerResponse<List<TagResponse>>> GetTagsAsync()
        {
            return await _tagService.GetTagsAsync();
        }

        [HttpPost]
        public async Task<ServerResponse<bool>> CreateTagAsync([FromBody] TagRequest tagRequest)
        {
            return await _tagService.CreateTagAsync(tagRequest);
        }

        [Authorize(Policy = "Admin")]
        [Route("admin")]
        [HttpGet]
        public async Task<ServerResponse<PageResult<TagAdminResponse>>> GetAdminTagsByPageAsync(AdminTableFilterRequest adminTableFilterRequest)
        {
            return await _tagService.GetAdminTagsByPageAsync(adminTableFilterRequest);
        }

        [Authorize(Policy = "Admin")]
        [HttpPut]
        public async Task<ServerResponse<bool>> UpdateTagAsync([FromBody] TagRequest tagRequest)
        {
            return await _tagService.UpdateTagAsync(tagRequest);
        }

        [Authorize(Policy = "Admin")]
        [Route("{id}")]
        [HttpDelete]
        public async Task<ServerResponse<bool>> DeleteTagAsync(long id)
        {
            return await _tagService.DeleteTagAsync(id);
        }
    }
}