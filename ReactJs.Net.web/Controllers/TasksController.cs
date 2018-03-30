using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactJs.Net.web.Data;
using ReactJs.Net.web.Models.Tasks;

namespace ReactJs.Net.web.Controllers
{
    public class TasksController : Controller
    {
        private readonly TaskDbContext _taskDbContext;

        public TasksController(TaskDbContext taskDbContext) { _taskDbContext = taskDbContext; }


        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public IActionResult Get(Guid? id)
        {
            return null;
        }

        [HttpGet]
        public IActionResult GetStatus()
        {
            return null;
        }

        [HttpGet]
        public IActionResult TaskUsers()
        {
            var taskUserEntities = _taskDbContext.TaskUsers
                                                 .Include(x=> x.UserTasks)
                                                 .ToList();
            var returnList = taskUserEntities
                .OrderByDescending(x=> x.CreatedOn)
                .Select(x => new TaskUserViewModel
                             {
                                 Id = x.Id,
                                 FirstName = x.FirstName,
                                 LastName = x.LastName,
                                 EmailAddress = x.EmailAddress,
                                 NumberOfTasks = x.UserTasks.Count
                             })
                .ToList();

            return Json(returnList.ToArray());
        }

        [HttpPost]
        public IActionResult AddTaskUser(TaskUserViewModel taskUserViewModel)
        {
            var newTaskUser = new TaskUserEntity
                              {
                                  CreatedBy = User.Identity.Name ?? "system",
                                  FirstName = taskUserViewModel.FirstName,
                                  LastName = taskUserViewModel.LastName,
                                  EmailAddress = taskUserViewModel.EmailAddress
                              };

            _taskDbContext.TaskUsers.Add(newTaskUser);
            _taskDbContext.SaveChanges();

            return RedirectToAction("Index");
        }


        [HttpPost]
        public IActionResult AddTaskForUser(TaskViewModel taskViewModel)
        {
            var taskUser = _taskDbContext.TaskUsers.FirstOrDefault(x => x.Id == taskViewModel.AssignedTo.GetValueOrDefault());
            var newTask = new TaskEntity
                              {
                                  CreatedBy = User.Identity.Name ?? "system",
                                  Name = taskViewModel.TaskName,
                                  Description = taskViewModel.TaskDescription,
                                  AssignedTo = taskUser?.Id,
                                  TaskStatus = TaskStatusEnum.New,
                                  DueOn = taskViewModel.DueOn
                              };
            _taskDbContext.Tasks.Add(newTask);
            _taskDbContext.SaveChanges();

            if (taskUser != null)
            {
                var userTask = new UserTaskEntity
                               {
                                   TaskUser = taskUser,
                                   Task = newTask
                               };
                _taskDbContext.UserTasks.Add(userTask);
            }
            
            _taskDbContext.SaveChanges();
            return RedirectToAction("Index");
        }

        public IActionResult GetTasks()
        {
            var tasks = _taskDbContext.Tasks.ToList();
            var returnList = tasks
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new TaskViewModel
                {
                                 Id = x.Id,
                                 DueOn = x.DueOn,
                                 TaskName = x.Name,
                                 TaskDescription = x.Description,
                                 TaskStatus= x.TaskStatus
                             })
                .ToList();

            return Json(returnList.ToArray());
        }

        public IActionResult DeleteUser(Guid id)
        {
            var taskUser = _taskDbContext.TaskUsers
                                         .Include(x => x.UserTasks)
                                         .FirstOrDefault(x => x.Id == id);


            if (taskUser == null)
            {
                return NotFound();
            }

            var userTasks = taskUser.UserTasks.ToList();
            
            foreach (var userTask in userTasks)
            {
                _taskDbContext.UserTasks.Remove(userTask);
            }
            _taskDbContext.SaveChanges();

            _taskDbContext.TaskUsers.Remove(taskUser);
            _taskDbContext.SaveChanges();

            return Ok();
        }
    }


    public class TaskUserViewModel
    {
        public Guid? Id { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int NumberOfTasks { get; set; }
    }


    public class TaskViewModel
    {
        public Guid? Id { get; set; }
        public DateTime? DueOn { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public TaskStatusEnum TaskStatus { get; set; }
        public Guid? AssignedTo { get; set; }
    }
}