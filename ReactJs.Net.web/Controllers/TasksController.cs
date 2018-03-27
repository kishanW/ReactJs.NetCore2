using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Extensions.Internal;
using ReactJs.Net.web.Data;

namespace ReactJs.Net.web.Controllers
{
    public class TasksController:Controller
    {
        private readonly TaskDbContext _taskDbContext;

        public TasksController(TaskDbContext taskDbContext)
        {
            _taskDbContext = taskDbContext;
        }


        public IActionResult Index()
        {
            //magic here

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
            var taskUsers = _taskDbContext.TaskUsers.Select(x=> new
                                                                {
                                                                    Key = x.Id,
                                                                    FirstName = x.FirstName,
                                                                    LastName = x.LastName,
                                                                    EmailAddress = x.EmailAddress,
                                                                    NumberOfTasks = DateTime.Now.Second
                                                                });
            var rand = new Random(DateTime.Now.Second);
            var randomNum = rand.Next(1, 100);
            var testItems = new List<Test>();
            for (var i = 0; i < 10; i++)
            {
                var testItem = new Test
                               {
                                   Key = Guid.NewGuid(),
                                   FirstName = $"TestUser{i}",
                                   LastName = $"LastName{i}",
                                   EmailAddress = $"{rand.Next(1, 100)}@gmail.com",
                                   NumberOfTasks = rand.Next(1, 100)
                };
                testItems.Add(testItem);
            }

            return Json(testItems.ToArray());
        }
    }

    public class Test
    {
        public Guid Key { get; set; }
        public string FirstName{ get; set; }
        public string LastName{ get; set; }
        public string EmailAddress{ get; set; }
        public int NumberOfTasks { get; set; }
    }
}