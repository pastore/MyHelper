namespace MyHelper.Api.Models.Request
{
    public interface ISortRequest
    {
        string SortColumn { get; set; }

        string SortDirection { get; set; }
    }
}
