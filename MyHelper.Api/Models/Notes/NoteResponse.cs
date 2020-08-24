using MyHelper.Api.Core;
using MyHelper.Api.Models.Tags;
using System;
using System.Collections.Generic;

namespace MyHelper.Api.Models.Notes
{
    public class NoteResponse
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public EVisibleType VisibleType { get; set; }

        public DateTime UpdateDate { get; set; }

        public long AppUserId { get; set; }

        public ICollection<TagViewModel> Tags { get; set; } = new List<TagViewModel>();
    }
}
