using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Tag;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/tags")]
    public class TagsController : BaseController
    {
        private readonly ITagService _tagService;

        public TagsController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ServerResponse<List<TagResponse>>), 200)]
        public async Task<ServerResponse<List<TagResponse>>> GetNotesAsync()
        {
            return AOResultToServerResponse(await _tagService.GetTagsAsync());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> CreateNoteAsync([FromBody] TagRequest tagRequest)
        {
            return AOResultToServerResponse(await _tagService.CreateTagAsync(tagRequest));
        }
    }
}