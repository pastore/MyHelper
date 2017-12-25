using System.Collections.Generic;
using System.Threading.Tasks;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;

namespace MyHelper.Api.Services.MhTask
{
    public interface IMhTaskService
    {
        Task<AOResult<List<MhTaskResponse>>> GetMhTasksAsync(MhTaskFilterRequest mhTaskFilterRequest);

        Task<AOResult<MhTaskResponse>> GetMhTaskAsync(long id);

        Task<AOResult> CreateMhTaskAsync(MhTaskRequest mhTaskRequest, DAL.Entities.MhTask parentMhTask = null);

        Task<AOResult> UpdateMhTaskAsync(MhTaskRequest mhTaskRequest);

        Task<AOResult> UpdateStatusMhTaskAsync(long id, int status);

        Task<AOResult> DeleteMhTaskAsync(long id);
    }
}
