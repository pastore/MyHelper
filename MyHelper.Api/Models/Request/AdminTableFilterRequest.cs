namespace MyHelper.Api.Models.Request
{
    public class AdminTableFilterRequest: IFetchRequest, ISortRequest
    {
        public string Search { get; set; }

        public string SortColumn { get; set; }

        public string SortDirection { get; set; }

        public int? Limit { get; set; }

        public int? Offset { get; set; }
    }
}
