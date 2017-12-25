using System;
using System.Collections.Generic;

namespace MyHelper.Api.DAL.Entities
{
    public class Note
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreateDate { get; set; } = DateTime.Now;

        public DateTime UpdateDate { get; set; }

        public int AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public ICollection<NoteTag> NoteTags { get; } = new List<NoteTag>();
    }
}
