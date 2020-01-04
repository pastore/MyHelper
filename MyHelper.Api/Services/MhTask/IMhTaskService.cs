using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.MHTask
{
    public interface IMhTaskService
    {
        Task<ServerResponse<List<MhTaskResponse>>> GetMhTasksAsync(int accountId, MhTaskFilterRequest mhTaskFilterRequest);

        Task<ServerResponse<MhTaskResponse>> GetMhTaskAsync(int accountId, long id);

        Task<ServerResponse<long>> CreateMhTaskAsync(MhTaskRequest mhTaskRequest, MhTask parentMhTask = null);

        Task<ServerResponse<bool>> UpdateMhTaskAsync(MhTaskRequest mhTaskRequest);

        Task<ServerResponse<bool>> UpdateStatusMhTaskAsync(long id, int status);

        Task<ServerResponse<bool>> DeleteMhTaskAsync(long id);

        FeedMessage CreateMhTaskFeedMessage(MhTaskRequest noteRequest, long sourceId);
    }
}
