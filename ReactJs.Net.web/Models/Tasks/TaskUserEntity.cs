using System.Collections.Generic;

namespace ReactJs.Net.web.Models.Tasks
{
    public class TaskUserEntity : BaseEntity
    {
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<UserTaskEntity> UserTasks { get; set; }
    }
}