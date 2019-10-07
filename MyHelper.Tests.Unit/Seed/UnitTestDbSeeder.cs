using Microsoft.AspNetCore.Hosting;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Helpers;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyHelper.Tests.Unit.Seed
{
    public class UnitTestDbSeeder
    {
        private readonly MyHelperContext _myHelperDbContext;

        public UnitTestDbSeeder(MyHelperContext dbContext) => _myHelperDbContext = dbContext;

        public void SeedDb()
        {
            using (var transaction = _myHelperDbContext.Database.BeginTransaction())
            {
                try
                {
                    if (!_myHelperDbContext.AppUsers.Any(x => x.UserRole == EUserRole.Admin))
                    {
                        var user1 = new AppUser
                        {
                            Email = "admin1@admin1.com",
                            Username = "admin1",
                            Password = HashPasswordHelper.Hash("admin1"),
                            UserRole = EUserRole.Admin,
                            CreatedDate = DateTime.Now
                        };
                        
                        var user2 = new AppUser
                        {
                            Email = "user2@user2.com",
                            Username = "user2",
                            Password = HashPasswordHelper.Hash("user2"),
                            UserRole = EUserRole.User,
                            CreatedDate = DateTime.Now
                        };

                        var user3 = new AppUser
                        {
                            Email = "user3@user3.com",
                            Username = "user3",
                            Password = HashPasswordHelper.Hash("user3"),
                            UserRole = EUserRole.User,
                            CreatedDate = DateTime.Now
                        };

                        _myHelperDbContext.AppUsers.AddRange(new List<AppUser>{ user1, user2, user3 });
                        _myHelperDbContext.SaveChanges();
                    }

                    if (!_myHelperDbContext.Tags.Any() && !_myHelperDbContext.Notes.Any() && !_myHelperDbContext.NoteTags.Any())
                    {
                        var note1 = new Note
                        {
                            Name = "note_name1",
                            Description = "note_name1_description",
                            CreateDate = DateTime.Now,
                            UpdateDate = DateTime.Now,
                            AppUser = _myHelperDbContext.AppUsers.FirstOrDefault()
                        };

                        var note2 = new Note
                        {
                            Name = "note_name2",
                            Description = "note_name2_description",
                            CreateDate = DateTime.Now,
                            UpdateDate = DateTime.Now,
                            AppUser = _myHelperDbContext.AppUsers.Skip(1).FirstOrDefault()
                        };

                        var note3 = new Note
                        {
                            Name = "note_name3",
                            Description = "note_name3_description",
                            CreateDate = DateTime.Now,
                            UpdateDate = DateTime.Now,
                            AppUser = _myHelperDbContext.AppUsers.Skip(2).FirstOrDefault()
                        };

                        var tags = new Tag[]
                        {
                            new Tag { Name = "tag1" },
                            new Tag { Name = "tag2" },
                            new Tag { Name = "tag3" }
                        };

                        _myHelperDbContext.AddRange(
                           new NoteTag { Note = note1, Tag = tags[0] },
                           new NoteTag { Note = note2, Tag = tags[1] },
                           new NoteTag { Note = note3, Tag = tags[2] }
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
