using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Models.Tag;

namespace MyHelper.Api.Models.Request
{
    public class NoteRequest
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int AppUserId { get; set; }

        public ICollection<long> TagIds { get; } = new List<long>();
    }
}
