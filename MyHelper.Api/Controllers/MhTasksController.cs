using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Tasks;
using MyHelper.Api.Services.MHTasks;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/tasks")]
    public class MhTasksController : BaseController 
    {
        private readonly IMhTaskService _mhTaskService;
        private readonly IRequestClient<IFeedMessage> _requestClient;

        public MhTasksController(
            IMhTaskService mhTaskService,
            IRequestClient<IFeedMessage> requestClient
            )
        {
            _mhTaskService = mhTaskService;
            _requestClient = requestClient;
        }

        [HttpGet]
        public async Task<ServerResponse<List<MhTaskResponse>>> GetMhTasksAsync(MhTaskFilterRequest mhTaskFilterRequest)
        {
            return await _mhTaskService.GetMhTasksAsync(AccountId, mhTaskFilterRequest);
        }

        [HttpGet("{id}")]
        public async Task<ServerResponse<MhTaskResponse>> GetMhTaskAsync(long id)
        {
            return await _mhTaskService.GetMhTaskAsync(AccountId, id);
        }

        [HttpPost]

        public async Task<ServerResponse<long>> CreateMhTaskAsync([FromBody] MhTaskRequest mhTaskRequest)
        {
            return await _mhTaskService.CreateMhTaskAsync(mhTaskRequest).ContinueWith(x =>
            {
                var request = _requestClient.Create(_mhTaskService.CreateMhTaskFeedMessage(mhTaskRequest, x.Result.Result));

                request.GetResponse<FeedMessage>();

                return x.Result;
            });
        }

        [HttpPut]
        public async Task<ServerResponse<bool>> UpdateMhTaskAsync([FromBody] MhTaskRequest mhTaskRequest)
        {
            return await _mhTaskService.UpdateMhTaskAsync(mhTaskRequest);
        }

        [HttpPatch("{id}")]
        public async Task<ServerResponse<bool>> UpdateMhTaskAsync(long id, [FromBody] int status)
        {
            return await _mhTaskService.UpdateStatusMhTaskAsync(id, status);
        }

        [HttpDelete("{id}")]
        public async Task<ServerResponse<bool>> DeleteMhTaskAsync(long id)
        {
            return await _mhTaskService.DeleteMhTaskAsync(id);
        }
    }
}