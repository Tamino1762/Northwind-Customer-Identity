
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Northwind.Models;

namespace Northwind.Controllers
{
    public class CartController : Controller
    {
        // this controller depends on the NorthwindRepository
        private INorthwindRepository repository;
        public CartController(INorthwindRepository repo) => repository = repo;
        public IActionResult Index(int id)
        {
            ViewBag.id = id;
            //return View();
            return View(repository.CartItems.OrderBy(c => c.Product.ProductName));
        }
    }
}