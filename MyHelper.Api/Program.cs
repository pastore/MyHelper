using System.Collections.Generic;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Reflection;
using Microsoft.Extensions.Configuration;

namespace MyHelper.Api
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var switchMappings = new Dictionary<string, string>()
            {
                { "--cdac", "CosmosDbAccountKey" },
            };

            CreateWebHostBuilder(args, switchMappings).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args, Dictionary<string, string> switchMappings) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.AddCommandLine(args, switchMappings);
                })
                .UseContentRoot(Path.GetDirectoryName(Assembly.GetEntryAssembly()?.Location))
                .UseStartup<Startup>();
    }
}
