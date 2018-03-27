using Microsoft.EntityFrameworkCore;
using ReactJs.Net.web.Models.Tasks;

namespace ReactJs.Net.web.Data
{
    public class TaskDbContext: DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
        {
        }
        
        public DbSet<TaskUserEntity> TaskUsers { get; set; }
        public DbSet<UserTaskEntity> UserTasks { get; set; }
        public DbSet<TaskEntity> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskUserEntity>().ToTable("TaskUserEntity");
            modelBuilder.Entity<UserTaskEntity>().ToTable("UserTaskEntity");
            modelBuilder.Entity<TaskEntity>().ToTable("TaskEntity");
        }
    }
}