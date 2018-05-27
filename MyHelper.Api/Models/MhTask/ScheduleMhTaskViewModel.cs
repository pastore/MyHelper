using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Core;

namespace MyHelper.Api.Models.MhTask
{
    public class ScheduleMhTaskViewModel
    {
        public EScheduleMhTaskType ScheduleMhTaskType { get; set; }

        public int? MaxCount { get; set; }
    }
}
