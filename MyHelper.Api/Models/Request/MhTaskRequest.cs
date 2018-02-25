using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Attributes;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Tag;

namespace MyHelper.Api.Models.Request
{
    public class MhTaskRequest
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public EMhTaskVisibleType MhTaskVisibleType { get; set; }

        public bool IsRecurring { get; set; } 

        public ScheduleMhTaskRequest ScheduleMhTaskRequest { get; set; }

        [Required]
        public int AppUserId { get; set; }

        [CollectionHasElements(ErrorMessage = "Collection must contain an element.")]
        public ICollection<long> TagIds { get; } = new List<long>();
    }
}
