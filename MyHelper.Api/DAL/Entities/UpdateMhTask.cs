using System;

namespace MyHelper.Api.DAL.Entities
{
    public class UpdateMhTask
    {
        public int Id { get; set; }

        public DateTime UpdateDate { get; set; }

        public string Description { get; set; }

        public long MhTaskId { get; set; }

        public MhTask MhTask { get; set; }
    }
}
