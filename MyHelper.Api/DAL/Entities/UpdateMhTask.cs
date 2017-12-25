using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.DAL.Entities
{
    public class UpdateMhTask
    {
        public int Id { get; set; }

        public DateTime UpdateDate { get; set; }

        public string Description { get; set; }

        public int MhTaskId { get; set; }

        public MhTask MhTask { get; set; }
    }
}
