using System;
using System.Collections.Generic;
using MyHelper.Api.Core;
using MyHelper.Api.Models.Request;

namespace MyHelper.Api.Models.Tasks
{
    public class MhTaskFilterRequest : IFetchRequest
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
