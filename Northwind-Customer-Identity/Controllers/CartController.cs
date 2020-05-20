
using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Northwind.Models;

namespace Northwind.Controllers
{
    public class CartController : Controller
    {
        // this controller depends on the NorthwindRepository
        private INorthwindRepository repository;
        //private UserManager<AppUser> userManager;
        public CartController(INorthwindRepository repo)
        {
            repository = repo;
        }
        // add auth + customer verification
        public IActionResult Index()
        {
            ViewBag.id = repository.Customers.FirstOrDefault(c => c.Email == User.Identity.Name).CustomerID;
            return View();
        }
    }
}