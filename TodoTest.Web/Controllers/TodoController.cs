using System;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TodoTest.Web.Data;
using TodoTest.Web.Models;
using TodoTest.Web.Models.ViewModels;

namespace TodoTest.Web.Controllers
{
    public class TodoController : Controller
    {
        private readonly IStore store;

        public TodoController(IStore store)
        {
            this.store = store;
        }

        public JsonResult List(int? page, int? pageSize)
        {
            var todos = store.Get<Todo>(page.GetPage(), pageSize.GetPageSize());
            return new JsonResult
            {
                Data = todos.Select(x => new TodoViewModel(x)),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpPost]
        public JsonResult Add(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "name cant be empty");
            }

            var createdTodo = store.Add(new Todo(name));
            return new JsonResult
            {
                Data = createdTodo
            };
        }

        [HttpPost]
        public JsonResult Remove(string guid)
        {
            var deletedToDo = store.Delete<Todo>(Guid.Parse(guid));
            if (deletedToDo == null)
            {
                throw new HttpException((int)HttpStatusCode.NotFound, "todo not found");
            }

            return new JsonResult
            {
                Data = new TodoViewModel(deletedToDo)
            };
        }

        [HttpPost]
        public JsonResult Update(TodoViewModel todo)
        {
            var updatedTodo = store.Update(new Todo(todo.Name, todo.Completed) { Id = Guid.Parse(todo.Id) });
            if (updatedTodo == null)
            {
                throw new HttpException((int)HttpStatusCode.NotFound, "todo not found");
            }

            return new JsonResult
            {
                Data = new TodoViewModel(updatedTodo)
            };
        }
    }
}
