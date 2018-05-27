using System;
using System.Collections.Generic;
using MyHelper.Api.Core;
using MyHelper.Api.Models.Tag;

namespace MyHelper.Api.Models.Request
{
    public class MhTaskFilterRequest
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public EMhTaskStatus? MhTaskStatus { get; set; }

        public string Search { get; set; }

        public IEnumerable<long> TagIds { get; set; } = new List<long>();

        public int? Limit { get; set; }

        public int? Offset { get; set; }
    }
}
