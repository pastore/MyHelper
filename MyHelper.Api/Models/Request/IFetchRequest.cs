using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Models.Request
{
    public interface IFetchRequest
    {
        int? Limit { get; set; }

        int? Offset { get; set; }
    }
}
