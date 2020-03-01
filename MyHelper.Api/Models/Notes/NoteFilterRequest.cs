using MyHelper.Api.Models.Request;
using System;
using System.Collections.Generic;

namespace MyHelper.Api.Models.Notes
{
    public class NoteFilterRequest : IFetchRequest
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string Search { get; set; }

        public IEnumerable<long> TagIds { get; set; } = new List<long>();

        public int? Limit { get; set; }

        public int? Offset { get; set; }
    }
}
