using MyHelper.Api.Core;
using System;
using System.Collections.Generic;
using MyHelper.Api.Models.MhTask;
using MyHelper.Api.Models.Tag;

namespace MyHelper.Api.Models.Response
{
    public class MhTaskResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? FinishDate { get; set; }

        public EMhTaskVisibleType MhTaskVisibleType { get; set; }

        public EMhTaskStatus MhTaskStatus { get; set; } 

        public EMhTaskState MhTaskState { get; set; }

        public bool IsRecurring { get; set; }

        public int? ParentId { get; set; }

        public int AppUserId { get; set; }

        public ScheduleMhTaskViewModel ScheduleMhTaskViewModel { get; set; }

        public ICollection<TagViewModel> Tags { get; set; } = new List<TagViewModel>();
    }
}
