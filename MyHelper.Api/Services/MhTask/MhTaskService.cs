using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;

namespace MyHelper.Api.Services.MHTask
{
    public class MhTaskService: BaseService, IMhTaskService
    {
        public MhTaskService(MyHelperContext myHelperDbContex, IMapper mapper) : base(myHelperDbContex, mapper) { }

        public async Task<AOResult<List<MhTaskResponse>>> GetMhTasksAsync(long accountId, MhTaskFilterRequest mhTaskFIlterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = _myHelperDbContext.MhTasks
                .Include(x => x.ScheduleMhTask)
                .Include(x => x.MhTaskTags)
                .ThenInclude(e => e.Tag)
                .Where(x => x.MhTaskState != EMhTaskState.Delete && x.AppUserId == accountId)
                .AsQueryable();

                query = FilterMhTasks(query, mhTaskFIlterRequest);

                return AOBuilder.SetSuccess(await query.ToAsyncEnumerable().Select(x => _mapper.Map<MhTask, MhTaskResponse>(x)).ToList()); 
            });
        }

        public async Task<AOResult<MhTaskResponse>> GetMhTaskAsync(long accountId, long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var mhTask = await _myHelperDbContext.MhTasks.FirstOrDefaultAsync(x => x.Id == id && x.AppUserId == accountId);

                if (mhTask == null)
                    return AOBuilder.SetError<MhTaskResponse>(Constants.Errors.TaskNotExists);

                return AOBuilder.SetSuccess(_mapper.Map<MhTask, MhTaskResponse>(mhTask));
            });
        }

        public async Task<AOResult> CreateMhTaskAsync(MhTaskRequest mhTaskRequest, MhTask parentMhTask = null)
        {
            return await BaseInvokeAsync(async () =>
            {
                var mhTask = new MhTask
                {
                    Name = mhTaskRequest.Name,
                    Description = mhTaskRequest.Description,
                    StartDate = mhTaskRequest.StartDate >= DateTime.Now ? mhTaskRequest.StartDate : DateTime.Now,
                    IsRecurring = mhTaskRequest.IsRecurring,
                    MhTaskVisibleType = mhTaskRequest.MhTaskVisibleType,
                    AppUserId = mhTaskRequest.AppUserId
                };

                if (parentMhTask != null)
                {
                    mhTask.Parent = parentMhTask;
                }

                await _myHelperDbContext.MhTasks.AddAsync(mhTask);

                if (mhTaskRequest.IsRecurring)
                {
                    var scheduleMhTask = new ScheduleMhTask
                    {
                        MhTask = mhTask,
                        MaxCount = mhTaskRequest.ScheduleMhTaskViewModel.MaxCount ?? 0,
                        ScheduleMhTaskType = mhTaskRequest.ScheduleMhTaskViewModel.ScheduleMhTaskType
                    };

                    await _myHelperDbContext.ScheduleMhTasks.AddAsync(scheduleMhTask);
                }

                if (mhTaskRequest.TagIds.Any())
                {
                    var mhTaskTags = mhTaskRequest.TagIds
                        .Join(_myHelperDbContext.Tags, o => o, i => i.Id, (o, i) => i)
                        .Select(x => new MhTaskTag
                        {
                            MhTask = mhTask,
                            Tag = x
                        });

                    await _myHelperDbContext.MhTaskTags.AddRangeAsync(mhTaskTags);
                }

                await AddToUpdateMhTask(_myHelperDbContext, mhTask, Constants.Updates.CreateMhTask);
                await _myHelperDbContext.SaveChangesAsync();

                return AOBuilder.SetSuccess();
            }, mhTaskRequest);   
        }

        public async Task<AOResult> UpdateMhTaskAsync(MhTaskRequest mhTaskRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                MhTask mhTask;

                if (mhTaskRequest.IsRecurring)
                {
                    mhTask = await _myHelperDbContext.MhTasks.Include(x => x.ScheduleMhTask)
                        .FirstOrDefaultAsync(x => x.Id == mhTaskRequest.Id);
                }
                else
                {
                    mhTask = await _myHelperDbContext.MhTasks.FirstOrDefaultAsync(x => x.Id == mhTaskRequest.Id);
                }

                if (mhTask == null)
                    return AOBuilder.SetError(Constants.Errors.TaskNotExists);

                if (mhTask.MhTaskState == EMhTaskState.ReSchedule)
                    return AOBuilder.SetError(Constants.Errors.TaskReShedule);

                mhTask.Name = mhTaskRequest.Name;
                mhTask.Description = mhTaskRequest.Description;
                mhTask.StartDate = mhTaskRequest.StartDate;
                mhTask.IsRecurring = mhTaskRequest.IsRecurring;
                mhTask.MhTaskVisibleType = mhTaskRequest.MhTaskVisibleType;

                if (mhTaskRequest.IsRecurring)
                {
                    if (mhTask.ScheduleMhTask == null)
                    {
                        mhTask.ScheduleMhTask = new ScheduleMhTask();
                    }

                    mhTask.ScheduleMhTask.MaxCount = mhTaskRequest.ScheduleMhTaskViewModel.MaxCount ?? 0;
                    mhTask.ScheduleMhTask.ScheduleMhTaskType = mhTaskRequest.ScheduleMhTaskViewModel.ScheduleMhTaskType;
                }

                _myHelperDbContext.MhTasks.Update(mhTask);
                
                var mhTaskTags = await _myHelperDbContext.MhTaskTags.Where(x => x.MhTaskId == mhTask.Id).ToListAsync();
                _myHelperDbContext.MhTaskTags.RemoveRange(mhTaskTags.Where(x => !mhTaskRequest.TagIds.Contains(x.TagId)));

                await _myHelperDbContext.MhTaskTags.AddRangeAsync(
                    mhTaskRequest.TagIds
                        .Join(_myHelperDbContext.Tags, o => o, i => i.Id, (o, i) => i)
                        .Where(x => !mhTaskTags.Select(y => y.TagId).Contains(x.Id))
                        .Select(x => new MhTaskTag { Tag = x, MhTask = mhTask }));

                await AddToUpdateMhTask(_myHelperDbContext, mhTask, Constants.Updates.UpdateEntireMhTask);
                await _myHelperDbContext.SaveChangesAsync();

                return AOBuilder.SetSuccess();
            }, mhTaskRequest);
        }

        public async Task<AOResult> UpdateStatusMhTaskAsync(long id, int status)
        {
            return await BaseInvokeAsync(async () =>
            {
                var mhTask = await _myHelperDbContext.MhTasks.FirstOrDefaultAsync(x => x.Id == id);

                if (mhTask == null)
                    return AOBuilder.SetError(Constants.Errors.TaskNotExists);

                mhTask.MhTaskStatus = (EMhTaskStatus) status;
                mhTask.FinishDate = (EMhTaskStatus)status == EMhTaskStatus.Done ? DateTime.Now : (DateTime?) null;

                _myHelperDbContext.MhTasks.Update(mhTask);
                await AddToUpdateMhTask(_myHelperDbContext, mhTask, Constants.Updates.UpdateStatusMhTask);

                await _myHelperDbContext.SaveChangesAsync();
                
                return AOBuilder.SetSuccess();
            });
        }

        public async Task<AOResult> DeleteMhTaskAsync(long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var mhTask = await _myHelperDbContext.MhTasks.FirstOrDefaultAsync(x => x.Id == id);

                if (mhTask == null)
                    return AOBuilder.SetError(Constants.Errors.TaskNotExists);

                mhTask.MhTaskState = EMhTaskState.Delete;

                _myHelperDbContext.MhTasks.Update(mhTask);
                await AddToUpdateMhTask(_myHelperDbContext, mhTask, Constants.Updates.DeleteMhTask);
                await _myHelperDbContext.SaveChangesAsync();

                return AOBuilder.SetSuccess();
            });
        }

        #region -- Private methods --

        private IQueryable<MhTask> FilterMhTasks(IQueryable<MhTask> query, MhTaskFilterRequest mhTaskFIlterRequest)
        {
            if (mhTaskFIlterRequest.FromDate.HasValue)
            {
                query = query.Where(x => x.StartDate >= mhTaskFIlterRequest.FromDate.Value);
            }

            if (mhTaskFIlterRequest.ToDate.HasValue)
            {
                query = query.Where(x => x.StartDate <= mhTaskFIlterRequest.ToDate.Value);
            }

            if (mhTaskFIlterRequest.MhTaskStatus.HasValue)
            {
                query = query.Where(x => x.MhTaskStatus == mhTaskFIlterRequest.MhTaskStatus.Value);
            }

            if (mhTaskFIlterRequest.TagIds.Any())
            {
                query = query.Where(x => x.MhTaskTags.Any(mhtag => mhTaskFIlterRequest.TagIds.Any(t => t == mhtag.Tag.Id)));
            }

            return query;
        }

        private async Task AddToUpdateMhTask(MyHelperContext myHelperDbContext, MhTask mhTask, string description)
        {
            var updateMhTask = new UpdateMhTask
            {
                Description = description,
                UpdateDate = DateTime.Now,
                MhTask = mhTask
            };

            await myHelperDbContext.UpdateMhTasks.AddAsync(updateMhTask);
        }

        #endregion
    }
}
