using System;

namespace ReactJs.Net.web.Models.Tasks
{
    public class UserTaskEntity:BaseEntity
    {
        public TaskUserEntity TaskUser { get; set; }
        public TaskEntity Task { get; set; }
    }
}