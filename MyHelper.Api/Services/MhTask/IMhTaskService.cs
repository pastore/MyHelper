using System.Collections.Generic;
using System.Threading.Tasks;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;

namespace MyHelper.Api.Services.MHTask
{
    public interface IMhTaskService
    {
        Task<AOResult<List<MhTaskResponse>>> GetMhTasksAsync(long accountId, MhTaskFilterRequest mhTaskFilterRequest);

        Task<AOResult<MhTaskResponse>> GetMhTaskAsync(long accountId, long id);

        Task<AOResult> CreateMhTaskAsync(MhTaskRequest mhTaskRequest, MhTask parentMhTask = null);

        Task<AOResult> UpdateMhTaskAsync(MhTaskRequest mhTaskRequest);

        Task<AOResult> UpdateStatusMhTaskAsync(long id, int status);

        Task<AOResult> DeleteMhTaskAsync(long id);
    }
}
