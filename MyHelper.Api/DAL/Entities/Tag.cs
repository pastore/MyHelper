using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Core;

namespace MyHelper.Api.DAL.Entities
{
    public class Tag
    {
        public long Id { get; set; }

        public string Name { get; set; }

        // Reverse navigation
        public ICollection<MhTask> MhTasks { get; set; }

        public ICollection<Note> Notes { get; set; }
    }
}
