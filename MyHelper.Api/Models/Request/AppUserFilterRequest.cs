using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Models.Request
{
    public class AppUserFilterRequest : IFetchRequest
    {
        public string Search { get; set; }

        public int? Limit { get; set; }

        public int? Offset { get; set; }
    }
}
