using MyHelper.Api.Core;
using MyHelper.Api.Core.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyHelper.Api.Models.Tasks
{
    public class MhTaskRequest
    {
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public EVisibleType VisibleType { get; set; }

        public EMhTaskStatus MhTaskStatus { get; set; }

        public bool IsRecurring { get; set; } 

        public ScheduleMhTaskViewModel ScheduleMhTaskViewModel { get; set; }

        [Required]
        public long AppUserId { get; set; }

        [CollectionHasElements(ErrorMessage = "Collection must contain an element.")]
        public ICollection<long> TagIds { get; set; } = new List<long>();
    }
}
