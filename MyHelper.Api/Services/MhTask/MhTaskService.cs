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

namespace MyHelper.Api.Services.MhTask
{
    public class MhTaskService: BaseService, IMhTaskService
    {
        public MhTaskService(MyHelperContext myHelperDbContex, IMapper mapper) : base(myHelperDbContex, mapper) { }

        public async Task<AOResult<List<MhTaskResponse>>> GetMhTasksAsync(MhTaskFilterRequest mhTaskFIlterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = _myHelperDbContext.MhTasks
                .Include(x => x.ScheduleMhTask)
                .Include(x => x.MhTaskTags)
                .ThenInclude(e => e.Tag)
                .Where(x => x.MhTaskState != EMhTaskState.Delete).AsQueryable();

                FilterMhTasks(query, mhTaskFIlterRequest);

                return AOBuilder.SetSuccess(await query.ToAsyncEnumerable().Select(x => _mapper.Map<DAL.Entities.MhTask, MhTaskResponse>(x)).ToList()); 
            });
        }

        public async Task<AOResult<MhTaskResponse>> GetMhTaskAsync(long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var mhTask = await _myHelperDbContext.MhTasks.FirstOrDefaultAsync(x => x.Id == id);

                if (mhTask == null)
                    return AOBuilder.SetError<MhTaskResponse>(Constants.Errors.TaskNotExists);

                return AOBuilder.SetSuccess(_mapper.Map<DAL.Entities.MhTask, MhTaskResponse>(mhTask));
            });
        }

        public async Task<AOResult> CreateMhTaskAsync(MhTaskRequest mhTaskRequest, DAL.Entities.MhTask parentMhTask = null)
        {
            return await BaseInvokeAsync(async () =>
            {
                var mhTask = new DAL.Entities.MhTask
                {
                    Name = mhTaskRequest.Name,
                    Description = mhTaskRequest.Description,
                    StartDate = mhTaskRequest.StartDate,
                    IsRecurring = mhTaskRequest.IsRecurring,
                    MhTaskVisibleType = mhTaskRequest.MhTaskVisibleType
                };

                if (parentMhTask != null)
                {
                    mhTask.Parent = parentMhTask;
                }

                await _myHelperDbContext.MhTasks.AddAsync(mhTask);
                await _myHelperDbContext.SaveChangesAsync();

                if (mhTaskRequest.IsRecurring)
                {
                    var scheduleMhTask = new ScheduleMhTask
                    {
                        MhTask = mhTask,
                        MaxCount = mhTaskRequest.ScheduleMhTask.MaxCount,
                        ScheduleMhTaskType = mhTaskRequest.ScheduleMhTask.ScheduleMhTaskType
                    };

                    await _myHelperDbContext.ScheduleMhTasks.AddAsync(scheduleMhTask);
                    await _myHelperDbContext.SaveChangesAsync();
                }

                if (mhTaskRequest.TagIds.Any())
                {
                    var mhTaskTags = mhTaskRequest.TagIds.Select(x =>  new MhTaskTag
                    {
                        MhTaskId = mhTask.Id,
                        TagId = x
                    });

                    await _myHelperDbContext.MhTaskTags.AddRangeAsync(mhTaskTags);
                    await _myHelperDbContext.SaveChangesAsync();
                }

                return AOBuilder.SetSuccess();
            }, mhTaskRequest);   
        }

        public async Task<AOResult> UpdateMhTaskAsync(MhTaskRequest mhTaskRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                DAL.Entities.MhTask mhTask;

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

                mhTask.Name = mhTaskRequest.Name;
                mhTask.Description = mhTaskRequest.Description;
                mhTask.IsRecurring = mhTaskRequest.IsRecurring;
                mhTask.MhTaskVisibleType = mhTaskRequest.MhTaskVisibleType;

                if (mhTaskRequest.IsRecurring)
                {
                    mhTask.ScheduleMhTask.MaxCount = mhTaskRequest.ScheduleMhTask.MaxCount;
                    mhTask.ScheduleMhTask.ScheduleMhTaskType = mhTaskRequest.ScheduleMhTask.ScheduleMhTaskType;
                }

                if (mhTaskRequest.StartDate >= DateTime.Now && mhTask.StartDate != mhTaskRequest.StartDate)
                {
                    mhTask.MhTaskState = EMhTaskState.ReSchedule;
                    await CreateMhTaskAsync(mhTaskRequest, mhTask);
                }

                _myHelperDbContext.MhTasks.Update(mhTask);
                await AddToUpdateMhTask(_myHelperDbContext, mhTask, Constants.Updates.UpdateEntireMhTask);
                await _myHelperDbContext.SaveChangesAsync();

                var mhTaskTags = await _myHelperDbContext.MhTaskTags.Where(x => x.MhTaskId == mhTask.Id).ToListAsync();
                _myHelperDbContext.MhTaskTags.RemoveRange(mhTaskTags.Where(x => !mhTaskRequest.TagIds.Contains(x.Tag.Id)));

                await _myHelperDbContext.MhTaskTags.AddRangeAsync(mhTaskRequest.TagIds
                    .Where(x => !mhTaskTags.Contains(new MhTaskTag {TagId = x, MhTaskId = mhTask.Id}))
                    .Select(x => new MhTaskTag{ MhTaskId = mhTask.Id, TagId = x}));
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

        private void FilterMhTasks(IQueryable<DAL.Entities.MhTask> query, MhTaskFilterRequest mhTaskFIlterRequest)
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
        }

        private async Task AddToUpdateMhTask(MyHelperContext myHelperDbContext, DAL.Entities.MhTask mhTask, string description)
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
