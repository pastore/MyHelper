using System.Collections.Generic;

namespace MyHelper.Api.Models.Response
{
    public class PageResult<T>
    {
        public List<T> Items { get; set; }

        public long TotalCount { get; set; }
    }
}
