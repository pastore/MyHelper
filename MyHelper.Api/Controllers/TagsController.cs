using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Tag;
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
    }
}