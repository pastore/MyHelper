using MyHelper.Api.Core;
using System;
using System.Collections.Generic;

namespace MyHelper.Api.DAL.Entities
{
    public class MhTask
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreateDate { get; set; } = DateTime.Now;

        public DateTime StartDate { get; set; }

        public DateTime? FinishDate { get; set; }

        public EVisibleType VisibleType { get; set; } = EVisibleType.Private;

        public EMhTaskStatus MhTaskStatus { get; set; } = EMhTaskStatus.None;

        public EMhTaskState MhTaskState { get; set; } = EMhTaskState.Current;

        public bool IsRecurring { get; set; }

        public long? ParentId { get; set; }

        public virtual MhTask Parent { get; set; }

        public int AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public ScheduleMhTask ScheduleMhTask { get; set; }

        // Reverse navigation
        public ICollection<UpdateMhTask> Updates { get; set; } = new List<UpdateMhTask>();

        public ICollection<MhTaskTag> MhTaskTags { get; } = new List<MhTaskTag>();

        public virtual ICollection<MhTask> Children { get; set; } = new List<MhTask>();
    }
}
