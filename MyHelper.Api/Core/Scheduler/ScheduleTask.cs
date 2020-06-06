using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Core.Scheduler
{
    public class ScheduleTask : ScheduledProcessor
    {
        public ScheduleTask(IServiceScopeFactory serviceScopeFactory) : base(serviceScopeFactory) { }

        protected override string Schedule => "1 0 * * *";

        public override Task ProcessInScope(IServiceProvider serviceProvider)
        {
            try
            {
                var dbContext = serviceProvider.GetRequiredService<MyHelperContext>();

                var mhTasks = dbContext.MhTasks
                    .Include(x => x.Children)
                    .Include(x => x.MhTaskTags)
                    .ThenInclude(e => e.Tag)
                    .Where(x => x.IsRecurring && x.ParentId == null && x.StartDate < DateTime.Now);

                foreach (var parentMhTask in mhTasks)
                {
                    var scheduleMhTask = dbContext.ScheduleMhTasks.First(x => x.MhTaskId == parentMhTask.Id);

                    if (!(parentMhTask.Children?.Count < scheduleMhTask.MaxCount)) continue;

                    var mhTask = CreateMhTask(parentMhTask, scheduleMhTask);

                    CreateMhTaskTags(dbContext, parentMhTask, mhTask);

                    CreateUpdateMhTask(dbContext, mhTask);

                    dbContext.MhTasks.Update(parentMhTask);
                }

                dbContext.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            
            return Task.CompletedTask;
        }

        #region -- Private methods --

        private MhTask CreateMhTask(MhTask parentMhTask, ScheduleMhTask scheduleMhTask)
        {
            var startDate = parentMhTask.Children.Any() && parentMhTask.Children.Last().StartDate >= parentMhTask.StartDate
                ? parentMhTask.Children.Last().StartDate
                : parentMhTask.StartDate;

            var mhTask = new MhTask
            {
                Name = parentMhTask.Name,
                Description = parentMhTask.Description,
                StartDate = startDate.AddDays((double)scheduleMhTask.ScheduleMhTaskType),
                AppUserId = parentMhTask.AppUserId,
                MhTaskState = EMhTaskState.ReSchedule,
                VisibleType = parentMhTask.VisibleType,
                Parent = parentMhTask
            };

            parentMhTask.Children.Add(mhTask);

            return mhTask;
        }

        private void CreateMhTaskTags(MyHelperContext dbContext, MhTask parentMhTask, MhTask mhTask)
        {
            var mhTaskTags = parentMhTask.MhTaskTags
                .Select(x => new MhTaskTag
                {
                    MhTask = mhTask,
                    Tag = x.Tag
                });

            dbContext.MhTaskTags.AddRangeAsync(mhTaskTags);
        }

        private void CreateUpdateMhTask(MyHelperContext dbContext, MhTask mhTask)
        {
            var updateMhTask = new UpdateMhTask
            {
                Description = Constants.Updates.CreateChildMhTask,
                UpdateDate = DateTime.Now,
                MhTask = mhTask
            };

            dbContext.UpdateMhTasks.AddAsync(updateMhTask);
        }

        #endregion
    }
}
