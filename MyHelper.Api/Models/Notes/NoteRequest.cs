using MyHelper.Api.Core;
using MyHelper.Api.Core.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyHelper.Api.Models.Notes
{
    public class NoteRequest
    {
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public EVisibleType VisibleType { get; set; }

        [Required]
        public int AppUserId { get; set; }

        [CollectionHasElements(ErrorMessage = "Collection must contain an element.")]
        public ICollection<long> TagIds { get; set; } = new List<long>();
    }
}
