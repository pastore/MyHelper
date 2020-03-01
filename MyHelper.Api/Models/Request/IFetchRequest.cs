namespace MyHelper.Api.Models.Request
{
    public interface IFetchRequest
    {
        int? Limit { get; set; }

        int? Offset { get; set; }
    }
}
