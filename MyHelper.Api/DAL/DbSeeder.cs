using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Core;
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
                        var user = new AppUser()
                        {
                            Email = "pastorednepr@gmail.com",
                            Username = "admin",
                            Password = CryptoHelper.Crypto.HashPassword("Pastore567"),
                            UserRole = EUserRole.Admin
                        };

                        _myHelperDbContext.AppUsers.Add(user);
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
