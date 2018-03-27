using System;

namespace ReactJs.Net.web.Models.Tasks
{
    public class UserTaskEntity:BaseEntity
    {
        public Guid TaskUserId { get; set; }
        public Guid TaskId { get; set; }
    }
}