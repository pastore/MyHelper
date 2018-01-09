using Microsoft.EntityFrameworkCore;
using MyHelper.Api.DAL.Entities;

namespace MyHelper.Api.DAL.Context
{
    public class MyHelperContext: DbContext
    {
        public MyHelperContext(DbContextOptions options) : base(options) { }

        public DbSet<AppUser> AppUsers { get; set; }

        public DbSet<Friend> Friends { get; set; }

        public DbSet<MhTask> MhTasks { get; set; }

        public DbSet<MhTaskTag> MhTaskTags { get; set; }

        public DbSet<ScheduleMhTask> ScheduleMhTasks { get; set; }

        public DbSet<UpdateMhTask> UpdateMhTasks { get; set; }

        public DbSet<Note> Notes { get; set; }

        public DbSet<NoteTag> NoteTags { get; set; }

        public  DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Friend>().HasKey(x => new { x.RequestedById, x.RequestedToId });

            modelBuilder.Entity<Friend>()
                .HasOne(a => a.RequestedBy)
                .WithMany(b => b.SentFriendRequests)
                .HasForeignKey(c => c.RequestedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Friend>()
                .HasOne(a => a.RequestedTo)
                .WithMany(b => b.ReceievedFriendRequests)
                .HasForeignKey(c => c.RequestedToId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MhTask>()
                .HasOne(a => a.AppUser)
                .WithMany(b => b.MhTasks)
                .HasForeignKey(c => c.AppUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Note>()
                .HasOne(a => a.AppUser)
                .WithMany(b => b.Notes)
                .HasForeignKey(c => c.AppUserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MhTask>()
                .HasMany(x => x.Children)
                .WithOne(x => x.Parent)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UpdateMhTask>()
                .HasOne(a => a.MhTask)
                .WithMany(b => b.Updates)
                .HasForeignKey(c => c.MhTaskId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<NoteTag>()
                .HasKey(t => new { t.NoteId, t.TagId });

            modelBuilder.Entity<MhTaskTag>()
                .HasKey(t => new { t.MhTaskId, t.TagId });

            modelBuilder.Entity<MhTask>()
                .HasOne(a => a.ScheduleMhTask)
                .WithOne(b => b.MhTask)
                .HasForeignKey<ScheduleMhTask>(b => b.MhTaskId);
        }
    }
}
