using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MyHelper.Api.Core.Attributes;

namespace MyHelper.Api.Models.Request
{
    public class NoteRequest
    {
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int AppUserId { get; set; }

        [CollectionHasElements(ErrorMessage = "Collection must contain an element.")]
        public ICollection<long> TagIds { get; } = new List<long>();
    }
}
