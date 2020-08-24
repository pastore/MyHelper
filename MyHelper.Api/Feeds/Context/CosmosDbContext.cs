using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Feeds.Entities;

namespace MyHelper.Api.Feeds.Context
{
    public class CosmosDbContext : DbContext
    {
        public CosmosDbContext(DbContextOptions<CosmosDbContext> options)
            : base(options) { }

        public DbSet<Feed> Feeds { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultContainer("Feeds");

            modelBuilder.Entity<Feed>()
                .HasPartitionKey(o => o.AppUserId)
                .OwnsMany(x => x.Tags);
        }
    }
}
