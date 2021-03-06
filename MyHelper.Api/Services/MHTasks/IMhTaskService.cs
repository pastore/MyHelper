﻿using MyHelper.Api.Core;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Tasks;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.MHTasks
{
    public interface IMhTaskService
    {
        Task<ServerResponse<List<MhTaskResponse>>> GetMhTasksAsync(long accountId, MhTaskFilterRequest mhTaskFilterRequest);

        Task<ServerResponse<MhTaskResponse>> GetMhTaskAsync(long accountId, long id);

        Task<ServerResponse<long>> CreateMhTaskAsync(MhTaskRequest mhTaskRequest, MhTask parentMhTask = null);

        Task<ServerResponse<bool>> UpdateMhTaskAsync(MhTaskRequest mhTaskRequest);

        Task<ServerResponse<bool>> UpdateStatusMhTaskAsync(long id, int status);

        Task<ServerResponse<bool>> DeleteMhTaskAsync(long id);

        FeedMessage CreateFeedMessage<T>(T noteRequest, EFeedAction feedAction);
    }
}
