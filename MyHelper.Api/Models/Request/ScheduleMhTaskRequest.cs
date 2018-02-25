using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Core;

namespace MyHelper.Api.Models.Request
{
    public class ScheduleMhTaskRequest
    {
        public EScheduleMhTaskType ScheduleMhTaskType { get; set; } = EScheduleMhTaskType.Daily;

        public int? MaxCount { get; set; }
    }
}
