// Execution data
const api = "https://api.soni.yessness.com";

// Load storage into memory
const user = localStorage["user"] ? JSON.parse(localStorage["user"]) : null;
const cart = localStorage["cart"] ? JSON.parse(localStorage["cart"]) : [];

// Function for emptying the cart
function emptyCart()
{
    cart.length = 0;
    localStorage.removeItem("cart");
}
