using System.Collections.Generic;

namespace MyHelper.Api.DAL.Entities
{
    public class Tag
    {
        public long Id { get; set; }

        public string Name { get; set; }

        // Reverse navigation
        public ICollection<NoteTag> NoteTags { get; } = new List<NoteTag>();
        public ICollection<MhTaskTag> MhTaskTags { get; } = new List<MhTaskTag>();

    }
}
