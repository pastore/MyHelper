using MyHelper.Api.Core;

namespace MyHelper.Api.Models.Task
{
    public class ScheduleMhTaskViewModel
    {
        public EScheduleMhTaskType ScheduleMhTaskType { get; set; }

        public int? MaxCount { get; set; }
    }
}
