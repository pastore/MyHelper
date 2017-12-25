using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Core;

namespace MyHelper.Api.DAL.Entities
{
    public class ScheduleMhTask
    {
        public long Id { get; set; }

        public EScheduleMhTaskType ScheduleMhTaskType { get; set; }

        public int? MaxCount { get; set; }

        public long MhTaskId { get; set; }

        public MhTask MhTask { get; set; }
    }
}
