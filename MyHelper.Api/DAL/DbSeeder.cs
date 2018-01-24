using System;
using System.Linq;
using Microsoft.WindowsAzure.Storage.RetryPolicies;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Helpers;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;

namespace MyHelper.Api.DAL
{
    public class DbSeeder
    {
        private readonly MyHelperContext _myHelperDbContext;

        public DbSeeder(MyHelperContext dbContext)
        {
            _myHelperDbContext = dbContext;
        }

        public void SeedDb()
        {
            using (var transaction = _myHelperDbContext.Database.BeginTransaction())
            {
                try
                {
                    if (!_myHelperDbContext.AppUsers.Any(x => x.UserRole == EUserRole.Admin))
                    {
                        var user = new AppUser
                        {
                            Email = "pastorednepr@gmail.com",
                            Username = "admin",
                            Password = HashPasswordHelper.Hash("Pastore567"),
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
                           new NoteTag { Note = note, Tag = tags[0]},
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
}
