using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Helpers;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Feeds.Context;
using System;
using System.Linq;

namespace MyHelper.Api.DAL
{
    public class DbSeeder
    {
        private readonly MyHelperContext _myHelperDbContext;
        private readonly CosmosDbContext _cosmosDbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public DbSeeder(
            MyHelperContext dbContext, 
            IWebHostEnvironment hostingEnvironment, 
            CosmosDbContext cosmosDbContext
            )
        {
            _myHelperDbContext = dbContext;
            _hostingEnvironment = hostingEnvironment;
            _cosmosDbContext = cosmosDbContext;
        }

        public void SeedDb()
        {
            _cosmosDbContext.Database.EnsureCreated();

            if (_hostingEnvironment.IsEnvironment(Constants.HostEnvironment.Docker))
            {
                _myHelperDbContext.Database.EnsureCreated();
            }

            using var transaction = _myHelperDbContext.Database.BeginTransaction();
            try
            {
                if (!_myHelperDbContext.AppUsers.Any(x => x.UserRole == EUserRole.Admin))
                {
                    var user = new AppUser
                    {
                        Email = "admin@admin.com",
                        Username = "admin",
                        Password = HashPasswordHelper.Hash("admin"),
                        UserRole = EUserRole.Admin,
                        CreatedDate = DateTime.Now
                    };

                    _myHelperDbContext.AppUsers.Add(user);
                    _myHelperDbContext.SaveChanges();
                }

                if (!_myHelperDbContext.Tags.Any() && !_myHelperDbContext.Notes.Any() && !_myHelperDbContext.NoteTags.Any())
                {
                    var note = new Note
                    {
                        Name = "Ef Core Migrations",
                        Description = "1. dotnet ef migrations add name 2. dotnet ef database update",
                        CreateDate = DateTime.Now,
                        UpdateDate = DateTime.Now,
                        AppUser = _myHelperDbContext.AppUsers.FirstOrDefault()
                    };

                    var tags = new Tag[]
                    {
                        new Tag { Name = "entity framework" },
                        new Tag { Name = "migrations" }
                    };

                    _myHelperDbContext.AddRange(
                        new NoteTag { Note = note, Tag = tags[0] },
                        new NoteTag { Note = note, Tag = tags[1] }
                    );
                    _myHelperDbContext.SaveChanges();
                }

                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
            }
        }
    }
}
