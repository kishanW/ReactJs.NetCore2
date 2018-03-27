using System;

namespace ReactJs.Net.web.Models.Tasks
{
    public class TaskEntity : BaseEntity
    {
        public TaskEntity()
        {
            TaskStatus = TaskStatusEnum.New;
        }
        
        public DateTime? DueOn { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public TaskStatusEnum TaskStatus { get; set; }
        public Guid? AssignedTo { get; set; }
    }

    public enum TaskStatusEnum
    {
        New,
        InProgress,
        Completed 
    }
}