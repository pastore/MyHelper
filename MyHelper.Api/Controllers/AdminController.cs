using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Tag;
using MyHelper.Api.Services.Token;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/admin")]
    public class AdminController : BaseController
    {
        private readonly ITagAdminService _tagAdminService;

        public AdminController(ITagAdminService tagAdminService, ITokenService tokenService) : base(tokenService)
        {
            _tagAdminService = tagAdminService;
        }

        [Route("tags")]
        [HttpGet]
        public async Task<ServerResponse<List<TagAdminResponse>>> GetTagsAsync()
        {
            return await _tagAdminService.GetAdminTagsAsync();
        }

        [Route("tags/{id}")]
        [HttpDelete]
        public async Task<ServerResponse<bool>> DeleteTagAsync(long id)
        {
            return await _tagAdminService.DeleteTagAsync(id);
        }
    }
}
