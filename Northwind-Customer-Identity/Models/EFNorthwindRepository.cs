using System;
using System.Linq;

namespace Northwind.Models
{
    public class EFNorthwindRepository : INorthwindRepository
    {
        // the repository class depends on the NorthwindContext service
        // which was registered at application startup
        private NorthwindContext context;
        public EFNorthwindRepository(NorthwindContext ctx)
        {
            context = ctx;
        }
        // create IQueryable for Categories & Products
        public IQueryable<Category> Categories => context.Categories;
        public IQueryable<Product> Products => context.Products;
        public IQueryable<Discount> Discounts => context.Discounts;
        public IQueryable<Customer> Customers => context.Customers;
        public IQueryable<CartItem> CartItems => context.CartItems;

        public int ProductId { get; private set; }

        public void AddCustomer(Customer customer)
        {
            context.Customers.Add(customer);
            context.SaveChanges();
        }

        public void EditCustomer(Customer customer)
        {
            var customerToUpdate = context.Customers.FirstOrDefault(c => c.CustomerID == customer.CustomerID);
            customerToUpdate.Address = customer.Address;
            customerToUpdate.City = customer.City;
            customerToUpdate.Region = customer.Region;
            customerToUpdate.PostalCode = customer.PostalCode;
            customerToUpdate.Country = customer.Country;
            customerToUpdate.Phone = customer.Phone;
            customerToUpdate.Fax = customer.Fax;
            context.SaveChanges();
        }

        public CartItem AddToCart(CartItemJSON cartItemJSON)
        {
            int CustomerId = context.Customers.FirstOrDefault(c => c.Email == cartItemJSON.email).CustomerID;
            int ProductId = cartItemJSON.id;
            // check for duplicate cart item
            CartItem cartItem = context.CartItems.FirstOrDefault(ci => ci.ProductId == ProductId && ci.CustomerId == CustomerId);
            if (cartItem == null)
            {
                // this is a new cart item
                cartItem = new CartItem()
                {
                    CustomerId = CustomerId,
                    ProductId = cartItemJSON.id,
                    Quantity = cartItemJSON.qty
                };
                context.Add(cartItem);
            }
            else
            {
                // for duplicate cart item, simply update the quantity
                cartItem.Quantity += cartItemJSON.qty;
            }

            context.SaveChanges();
            cartItem.Product = context.Products.Find(cartItem.ProductId);
            return cartItem;
        }
        public CartItem ViewCart(CartItemJSON cartItemJSON)
        {
            int CustomerId = context.Customers.FirstOrDefault(c => c.Email == cartItemJSON.email).CustomerID;
            int ProductId = cartItemJSON.id;
            // check for duplicate cart item
            CartItem cartItem = context.CartItems.FirstOrDefault(ci => ci.ProductId == ProductId && ci.CustomerId == CustomerId);

            cartItem.Product = context.Products.Find(cartItem.ProductId);
            return cartItem;
        }
        public void EditCart(CartItemJSON cartItem, int id) //update like in the customer edit table?
        {
            //int CustomerId = repository.Customers.FirstOrDefault(c => c.Email == User.Identity.Name).CustomerID;
            var itemToUpdate = context.CartItems.FirstOrDefault(ci => ci.ProductId == cartItem.id && ci.CustomerId == id);
            //context.CartItems
            //Console.Write("hello");
            //System.Diagnostics.Debug.WriteLine("hello");
            //System.Diagnostics.Debug.WriteLine(cartItem.qty);
            //System.Diagnostics.Debug.WriteLine("item: " + itemToUpdate.FirstOrDefault().Quantity);
            itemToUpdate.Quantity = cartItem.qty; //update quantity
            context.SaveChanges();
            //return itemToUpdate;
        }
    }
}