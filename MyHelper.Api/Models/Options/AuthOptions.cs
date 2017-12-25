namespace MyHelper.Api.Models.Options
{
    public class AuthOptions
    {
        public string Issuer { get; set; }

        public string Audience { get; set; }

        public string Key { get; set; }

        public int MinutesLifetime { get; set; }
    }
}
