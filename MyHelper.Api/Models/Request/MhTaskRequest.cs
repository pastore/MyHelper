using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Core;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Tag;

namespace MyHelper.Api.Models.Request
{
    public class MhTaskRequest
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public EMhTaskVisibleType MhTaskVisibleType { get; set; }

        public bool IsRecurring { get; set; }

        public ScheduleMhTask ScheduleMhTask { get; set; }

        public int AppUserId { get; set; }

        public ICollection<long> TagIds { get; } = new List<long>();
    }
}
