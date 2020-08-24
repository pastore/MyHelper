using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Core;
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
        private readonly ISendEndpointProvider _sendEndpointProvider;

        public MhTasksController(
            IMhTaskService mhTaskService,
            ISendEndpointProvider sendEndpointProvider)
        {
            _mhTaskService = mhTaskService;
            _sendEndpointProvider = sendEndpointProvider;
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
            var serverResponse = await _mhTaskService.CreateMhTaskAsync(mhTaskRequest);

            mhTaskRequest.Id = serverResponse.Result;
            await _sendEndpointProvider.Send(_mhTaskService.CreateFeedMessage(mhTaskRequest, EFeedAction.Create));

            return serverResponse;
        }

        [HttpPut]
        public async Task<ServerResponse<bool>> UpdateMhTaskAsync([FromBody] MhTaskRequest mhTaskRequest)
        {
            var serverResponse = await _mhTaskService.UpdateMhTaskAsync(mhTaskRequest);

            await _sendEndpointProvider.Send(_mhTaskService.CreateFeedMessage(mhTaskRequest, EFeedAction.Update));

            return serverResponse;
        }

        [HttpPatch("{id}")]
        public async Task<ServerResponse<bool>> UpdateMhTaskAsync(long id, [FromBody] int status)
        {
            return await _mhTaskService.UpdateStatusMhTaskAsync(id, status);
        }

        [HttpDelete("{id}")]
        public async Task<ServerResponse<bool>> DeleteMhTaskAsync(long id)
        {
            var serverResponse = await _mhTaskService.DeleteMhTaskAsync(id);

            await _sendEndpointProvider.Send(
                _mhTaskService.CreateFeedMessage(new MhTaskRequest {Id = id, AppUserId = AccountId},
                    EFeedAction.Delete));

            return serverResponse;
        }
    }
}