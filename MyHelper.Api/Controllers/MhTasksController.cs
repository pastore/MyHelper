using System.Collections.Generic;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.MHTask;
using MyHelper.Api.Services.Token;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/tasks")]
    public class MhTasksController : BaseController 
    {
        private readonly IMhTaskService _mhTaskService;
        private readonly IRequestClient<IFeedMessage> _requestClient;

        public MhTasksController(IMhTaskService mhTaskService, ITokenService tokenService, IRequestClient<IFeedMessage> requestClient) : base(tokenService)
        {
            _mhTaskService = mhTaskService;
            _requestClient = requestClient;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ServerResponse<List<MhTaskResponse>>), 200)]
        public async Task<ServerResponse<List<MhTaskResponse>>> GetMhTasksAsync(MhTaskFilterRequest mhTaskFilterRequest)
        {
            return AOResultToServerResponse( await _mhTaskService.GetMhTasksAsync(AccountId, mhTaskFilterRequest));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ServerResponse<MhTaskResponse>), 200)]
        public async Task<ServerResponse<MhTaskResponse>> GetMhTaskAsync(long id)
        {
            return AOResultToServerResponse(await _mhTaskService.GetMhTaskAsync(AccountId, id));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> CreateMhTaskAsync([FromBody] MhTaskRequest mhTaskRequest)
        {
            return AOResultToServerResponse(await _mhTaskService.CreateMhTaskAsync(mhTaskRequest).ContinueWith(x =>
            {
                var request = _requestClient.Create(_mhTaskService.CreateMhTaskFeedMessage(mhTaskRequest, x.Result.Result));

                request.GetResponse<FeedMessage>();

                return x.Result;
            }));
        }

        [HttpPut]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> UpdateMhTaskAsync([FromBody] MhTaskRequest mhTaskRequest)
        {
            return AOResultToServerResponse(await _mhTaskService.UpdateMhTaskAsync(mhTaskRequest));
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> UpdateMhTaskAsync(long id, [FromBody] int status)
        {
            return AOResultToServerResponse(await _mhTaskService.UpdateStatusMhTaskAsync(id, status));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> DeleteMhTaskAsync(long id)
        {
            return AOResultToServerResponse(await _mhTaskService.DeleteMhTaskAsync(id));
        }
    }
}