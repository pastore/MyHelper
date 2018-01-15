using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyHelper.Api.Core.Mappings;
using MyHelper.Api.DAL;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.Models.Options;
using MyHelper.Api.Services.Account;
using MyHelper.Api.Services.MhTask;
using MyHelper.Api.Services.Note;
using MyHelper.Api.Services.Token;

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
            
            services.Configure<AuthOptions>(Configuration.GetSection("Auth"));

            services.AddEntityFrameworkNpgsql()
                .AddDbContext<MyHelperContext>(options => options.UseNpgsql(Configuration["Data:Postgresql:ConnectionString"]));

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IMhTaskService, MhTaskService>();
            services.AddScoped<INoteService, NoteService>();

            var sp = services.BuildServiceProvider();
            var tokenService = sp.GetService<ITokenService>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = tokenService.GetTokenValidationParameters();
                });

            services.AddScoped<DbSeeder>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DataToResponseMapperProfile());
            });
            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, DbSeeder seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseCors("AllowAll");
            app.UseMvc();

            seeder.SeedDb();
        }
    }
}
