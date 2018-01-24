using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Models.Tag;

namespace MyHelper.Api.Models.Response
{
    public class NoteResponse
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime UpdateDate { get; set; }

        public int AppUserId { get; set; }

        public ICollection<TagViewModel> Tags { get; set; } = new List<TagViewModel>();
    }
}
