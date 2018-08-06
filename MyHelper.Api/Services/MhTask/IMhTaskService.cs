using System.Collections.Generic;
using System.Threading.Tasks;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;

namespace MyHelper.Api.Services.MHTask
{
    public interface IMhTaskService
    {
        Task<AOResult<List<MhTaskResponse>>> GetMhTasksAsync(int accountId, MhTaskFilterRequest mhTaskFilterRequest);

        Task<AOResult<MhTaskResponse>> GetMhTaskAsync(int accountId, long id);

        Task<AOResult<long>> CreateMhTaskAsync(MhTaskRequest mhTaskRequest, MhTask parentMhTask = null);

        Task<AOResult> UpdateMhTaskAsync(MhTaskRequest mhTaskRequest);

        Task<AOResult> UpdateStatusMhTaskAsync(long id, int status);

        Task<AOResult> DeleteMhTaskAsync(long id);

        FeedMessage CreateMhTaskFeedMessage(MhTaskRequest noteRequest, long sourceId);
    }
}
