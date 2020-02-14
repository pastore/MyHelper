using AutoMapper;
using GreenPipes;
using MassTransit;
using MassTransit.ExtensionsDependencyInjectionIntegration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MyHelper.Api.Core.Mappings;
using MyHelper.Api.Core.Messanging;
using MyHelper.Api.Core.Messanging.Consumers;
using MyHelper.Api.Core.Middleware;
using MyHelper.Api.Core.Scheduler;
using MyHelper.Api.DAL;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Options;
using MyHelper.Api.Services.Account;
using MyHelper.Api.Services.Feeds;
using MyHelper.Api.Services.Friends;
using MyHelper.Api.Services.MHTask;
using MyHelper.Api.Services.Notes;
using MyHelper.Api.Services.Tag;
using MyHelper.Api.Services.Token;
using MyHelper.Api.Services.User;
using System;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace MyHelper.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region -- Asp Net Core  --

            services.AddApiVersioning(
                o => o.ReportApiVersions = true
            );

            services.AddMvcCore()
                .AddApiExplorer()
                .AddAuthorization()
                .AddFormatterMappings()
                .AddDataAnnotations()
                .AddJsonFormatters()
                .AddCors(builder =>
                {
                    builder.AddPolicy("AllowAll", policy =>
                    {
                        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                    });
                });
            services.AddAutoMapper();

            #endregion

            #region -- App settings --

            services.Configure<AuthOptions>(Configuration.GetSection("Auth"));
            services.Configure<AuthOptions>(Configuration.GetSection("RabitMQ"));

            #endregion

            #region -- Ef Core --

            services.AddEntityFrameworkNpgsql()
                .AddDbContext<MyHelperContext>(options => options.UseNpgsql(Configuration["ConnectionStrings:Postgresql"]));

            #endregion

            #region -- Services -- 

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IMhTaskService, MhTaskService>();
            services.AddScoped<INoteService, NoteService>();
            services.AddScoped<IAppUserService, AppUserService>();
            services.AddScoped<IFriendService, FriendService>();
            services.AddScoped<ITagService, TagService>();
            services.AddScoped<IFeedService, FeedService>();
            services.AddScoped<ITagAdminService, TagAdminService>();
            #endregion

            #region -- Authentication --

            var sp = services.BuildServiceProvider();
            var tokenService = sp.GetService<ITokenService>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {

                    options.TokenValidationParameters = tokenService.GetTokenValidationParameters();
                });

            #endregion

            services.AddScoped<DbSeeder>();

            #region -- Automapper config --

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DataToResponseMapperProfile());
            });
            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            #endregion

            #region -- Scheduling mhtasks --

            services.AddSingleton<IHostedService, ScheduleTask>();

            #endregion

            #region -- Messanging --

            services.AddScoped<FeedConsumer>();

            services.AddMassTransit(x =>
            {
                x.AddConsumer<FeedConsumer>();
            });

            services.AddSingleton(provider =>
            {
                var rabbitMqHost = Configuration["RabitMQ:Host"];
                var username = Configuration["RabitMQ:UserName"];
                var password = Configuration["RabitMQ:Password"];
                var queueAddress = Configuration["RabitMQ:QueueAddress"];

                var busControl = Bus.Factory.CreateUsingRabbitMq(cfg =>
                {
                    var host = cfg.Host(new Uri(rabbitMqHost), h =>
                    {
                        h.Username(username);
                        h.Password(password);
                    });

                    cfg.ReceiveEndpoint(host, queueAddress, e =>
                    {
                        e.PrefetchCount = 16;
                        e.UseMessageRetry(x => x.Interval(2, 100));

                        e.LoadFrom(provider);

                        EndpointConvention.Map<IFeedMessage>(e.InputAddress);
                    });
                });

                busControl.Start();
                return busControl;
            });

            services.AddSingleton<IPublishEndpoint>(provider => provider.GetRequiredService<IBusControl>());
            services.AddSingleton<ISendEndpointProvider>(provider => provider.GetRequiredService<IBusControl>());
            services.AddSingleton<IBus>(provider => provider.GetRequiredService<IBusControl>());

            services.AddScoped(provider => provider.GetRequiredService<IBus>().CreateRequestClient<IFeedMessage>());

            services.AddSingleton<IHostedService, BusService>();

            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, DbSeeder seeder)
        {
            app.UseMiddleware(typeof(ErrorHandlingMiddleware));
            app.UseAuthentication();
            app.UseCors("AllowAll");
            app.UseMvc();

            seeder.SeedDb();
        }
    }
}
