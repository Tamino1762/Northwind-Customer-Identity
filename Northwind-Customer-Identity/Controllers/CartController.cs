
using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        public IActionResult Index()
        {
            ViewBag.id = repository.Customers.FirstOrDefault(c => c.Email == User.Identity.Name).CustomerID;
            return View();
        }

        public IActionResult DeleteItem(int ProductId, int CustomerId)
        {
            var itemToDelete = repository.CartItems.FirstOrDefault(ci => ci.ProductId == ProductId && ci.CustomerId == CustomerId);
            repository.DeleteItem(itemToDelete);
            return RedirectToAction("Index");
        }

        public IActionResult pay(int CustomerId)
        {
            var itemsToDelete = repository.CartItems.Where(ci => ci.CustomerId == CustomerId);
            repository.pay(itemsToDelete);
            return RedirectToAction("Index");
        }
    }
}