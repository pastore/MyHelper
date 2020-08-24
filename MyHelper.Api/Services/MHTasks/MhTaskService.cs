using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Exceptions;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.MHTasks
{
    public class MhTaskService: BaseService<MyHelperContext>, IMhTaskService
    {
        public MhTaskService(MyHelperContext myHelperDbContex, IMapper mapper) : base(myHelperDbContex, mapper) { }

        public async Task<ServerResponse<List<MhTaskResponse>>> GetMhTasksAsync(long accountId, MhTaskFilterRequest mhTaskFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = DbContext.MhTasks
                    .AsQueryable()
                    .Include(x => x.ScheduleMhTask)
                    .Include(x => x.MhTaskTags)
                    .ThenInclude(e => e.Tag)
                    .Where(x => x.MhTaskState != EMhTaskState.Delete && x.AppUserId == accountId);

                query = FilterMhTasks(query, mhTaskFilterRequest);

                query = query.OrderBy(x => x.StartDate);

                query = FetchItems(query, mhTaskFilterRequest);

                return ServerResponseBuilder.Build(await query.ToAsyncEnumerable()
                    .Select(x => Mapper.Map<MhTask, MhTaskResponse>(x)).ToListAsync());
            });
        }

        public async Task<ServerResponse<MhTaskResponse>> GetMhTaskAsync(long accountId, long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var mhTask = await DbContext.MhTasks
                    .AsQueryable()
                    .FirstOrDefaultAsync(x => x.Id == id && x.AppUserId == accountId);

                if (mhTask == null)
                    throw new NotFoundException(Constants.Errors.TaskNotExists);

                return ServerResponseBuilder.Build(Mapper.Map<MhTask, MhTaskResponse>(mhTask));
            });
        }

        public async Task<ServerResponse<long>> CreateMhTaskAsync(MhTaskRequest mhTaskRequest, MhTask parentMhTask = null)
        {
            return await BaseInvokeAsync(async () =>
            {
                var mhTask = new MhTask
                {
                    Name = mhTaskRequest.Name,
                    Description = mhTaskRequest.Description,
                    StartDate = mhTaskRequest.StartDate >= DateTime.Now ? mhTaskRequest.StartDate : DateTime.Now,
                    IsRecurring = mhTaskRequest.IsRecurring,
                    VisibleType = mhTaskRequest.VisibleType,
                    AppUserId = mhTaskRequest.AppUserId
                };

                if (parentMhTask != null)
                {
                    mhTask.Parent = parentMhTask;
                }

                await DbContext.MhTasks.AddAsync(mhTask);

                if (mhTaskRequest.IsRecurring)
                {
                    var scheduleMhTask = new ScheduleMhTask
                    {
                        MhTask = mhTask,
                        MaxCount = mhTaskRequest.ScheduleMhTaskViewModel.MaxCount ?? 0,
                        ScheduleMhTaskType = mhTaskRequest.ScheduleMhTaskViewModel.ScheduleMhTaskType
                    };

                    await DbContext.ScheduleMhTasks.AddAsync(scheduleMhTask);
                }

                if (mhTaskRequest.TagIds.Any())
                {
                    var mhTaskTags = mhTaskRequest.TagIds
                        .Join(DbContext.Tags, o => o, i => i.Id, (o, i) => i)
                        .Select(x => new MhTaskTag
                        {
                            MhTask = mhTask,
                            Tag = x
                        });

                    await DbContext.MhTaskTags.AddRangeAsync(mhTaskTags);
                }

                await AddToUpdateMhTask(DbContext, mhTask, Constants.Updates.CreateMhTask);
                await DbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(mhTask.Id);
            }, mhTaskRequest);   
        }

        public async Task<ServerResponse<bool>> UpdateMhTaskAsync(MhTaskRequest mhTaskRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                MhTask mhTask;

                if (mhTaskRequest.IsRecurring)
                {
                    mhTask = await DbContext.MhTasks.Include(x => x.ScheduleMhTask)
                        .FirstOrDefaultAsync(x => x.Id == mhTaskRequest.Id);
                }
                else
                {
                    mhTask = await DbContext.MhTasks
                        .AsQueryable()
                        .FirstOrDefaultAsync(x => x.Id == mhTaskRequest.Id);
                }

                if (mhTask == null)
                    throw new NotFoundException(Constants.Errors.TaskNotExists);

                if (mhTask.MhTaskState == EMhTaskState.ReSchedule)
                    throw new ConflictException(Constants.Errors.TaskReSheduleCannotBeUpdated);

                mhTask.Name = mhTaskRequest.Name;
                mhTask.Description = mhTaskRequest.Description;
                mhTask.StartDate = mhTaskRequest.StartDate;
                mhTask.IsRecurring = mhTaskRequest.IsRecurring;
                mhTask.VisibleType = mhTaskRequest.VisibleType;

                if (mhTaskRequest.IsRecurring)
                {
                    if (mhTask.ScheduleMhTask == null)
                    {
                        mhTask.ScheduleMhTask = new ScheduleMhTask();
                    }

                    mhTask.ScheduleMhTask.MaxCount = mhTaskRequest.ScheduleMhTaskViewModel.MaxCount ?? 0;
                    mhTask.ScheduleMhTask.ScheduleMhTaskType = mhTaskRequest.ScheduleMhTaskViewModel.ScheduleMhTaskType;
                }

                DbContext.MhTasks.Update(mhTask);
                
                var mhTaskTags = await DbContext.MhTaskTags
                    .AsQueryable()
                    .Where(x => x.MhTaskId == mhTask.Id).ToListAsync();
                DbContext.MhTaskTags.RemoveRange(mhTaskTags.Where(x => !mhTaskRequest.TagIds.Contains(x.TagId)));

                await DbContext.MhTaskTags.AddRangeAsync(
                    mhTaskRequest.TagIds
                        .Join(DbContext.Tags, o => o, i => i.Id, (o, i) => i)
                        .Where(x => !mhTaskTags.Select(y => y.TagId).Contains(x.Id))
                        .Select(x => new MhTaskTag { Tag = x, MhTask = mhTask }));

                await AddToUpdateMhTask(DbContext, mhTask, Constants.Updates.UpdateEntireMhTask);
                await DbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            }, mhTaskRequest);
        }

        public async Task<ServerResponse<bool>> UpdateStatusMhTaskAsync(long id, int status)
        {
            return await BaseInvokeAsync(async () =>
            {
                var mhTask = await DbContext.MhTasks
                    .AsQueryable()
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (mhTask == null)
                    throw new NotFoundException(Constants.Errors.TaskNotExists);

                mhTask.MhTaskStatus = (EMhTaskStatus) status;
                mhTask.FinishDate = (EMhTaskStatus)status == EMhTaskStatus.Done ? DateTime.Now : (DateTime?) null;

                DbContext.MhTasks.Update(mhTask);
                await AddToUpdateMhTask(DbContext, mhTask, Constants.Updates.UpdateStatusMhTask);

                await DbContext.SaveChangesAsync();
                
                return ServerResponseBuilder.Build(true);
            });
        }

        public async Task<ServerResponse<bool>> DeleteMhTaskAsync(long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var mhTask = await DbContext.MhTasks
                    .AsQueryable()
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (mhTask == null)
                    throw new NotFoundException(Constants.Errors.TaskNotExists);

                mhTask.MhTaskState = EMhTaskState.Delete;

                DbContext.MhTasks.Update(mhTask);
                await AddToUpdateMhTask(DbContext, mhTask, Constants.Updates.DeleteMhTask);
                await DbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            });
        }


        #region -- Private methods --

        private IQueryable<MhTask> FilterMhTasks(IQueryable<MhTask> query, MhTaskFilterRequest mhTaskFilterRequest)
        {
            if (mhTaskFilterRequest.FromDate.HasValue)
            {
                query = query.Where(x => x.StartDate >= mhTaskFilterRequest.FromDate.Value);
            }

            if (mhTaskFilterRequest.ToDate.HasValue)
            {
                query = query.Where(x => x.StartDate <= mhTaskFilterRequest.ToDate.Value);
            }

            if (mhTaskFilterRequest.MhTaskStatus.HasValue)
            {
                query = query.Where(x => x.MhTaskStatus == mhTaskFilterRequest.MhTaskStatus.Value);
            }

            if (!string.IsNullOrWhiteSpace(mhTaskFilterRequest.Search))
            {
                query = query.Where(x => x.Name.ToLower().Contains(mhTaskFilterRequest.Search.ToLower()));
            }

            if (mhTaskFilterRequest.TagIds.Any())
            {
                query = query.Where(x => x.MhTaskTags.Any(mhtag => mhTaskFilterRequest.TagIds.Any(t => t == mhtag.Tag.Id)));
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
