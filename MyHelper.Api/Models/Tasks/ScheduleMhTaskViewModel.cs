using MyHelper.Api.Core;

namespace MyHelper.Api.Models.Tasks
{
    public class ScheduleMhTaskViewModel
    {
        public EScheduleMhTaskType ScheduleMhTaskType { get; set; }

        public int? MaxCount { get; set; }
    }
}
