using System;
using System.Collections.Generic;
using System.Linq;
using ReactJs.Net.web.Models.Tasks;

namespace ReactJs.Net.web.Data
{
    public static class DbInitializer
    {
        public static void Initialize(TaskDbContext taskDbContext)
        {
            taskDbContext.Database.EnsureCreated();

            // Look for any TaskUsers.
            if (taskDbContext.TaskUsers.Any())
            {
                return;   // DB has been seeded
            }

            var taskUsers = new List<TaskUserEntity>();
            for (var i = 0; i < 5; i++)
            {
                var taskUser = new TaskUserEntity
                               {
                                   CreatedOn = DateTime.Now,
                                   EmailAddress = $"{DateTime.Today:MMddyy}U{i+1}@gmail.com",
                                   FirstName = $"TaskUser",
                                   LastName = $"{i + 1}ln"
                               };
                
                taskUsers.Add(taskUser);
            }

            foreach (var taskUser in taskUsers)
            {
                taskDbContext.TaskUsers.Add(taskUser);
            }
            taskDbContext.SaveChanges();

        }
    }
}