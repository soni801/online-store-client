// Variables
let products;

// Function for fetching product list from the API
async function fetchProducts()
{
    products = (await axios.get(`${api}/products/all`)).data;
}

// Function for loading product list into UI
function loadProducts(list = products)
{
    document.querySelector("#product-list").innerHTML = "";
    for (const product of list)
    {
        document.querySelector("#product-list").innerHTML += `
            <div class="product shadow rounded invert-selection">
                <div class="info">
                    <img class="slight-shadow rounded square" src="${product.imageUrl}" alt="${product.name}">
                    <div class="horizontal">
                        <h3>${product.name}</h3>
                        <p><i>${product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</i></p>
                    </div>
                    <p>${product.description}</p>
                </div>
                <div class="horizontal breathe-before">
                    <p class="faded"><i>${product.stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} på lager</i></p>
                    <span class="cart transition" data-product-index="${products.indexOf(product)}"></span>
                </div>
            </div>
        `;
    }

    $(".cart").load("/assets/icons/cart.html").click(e =>
    {
        if (localStorage["user"])
        {
            cart.push(products[e.currentTarget.getAttribute("data-product-index")]);
            localStorage["cart"] = JSON.stringify(cart);
        }
        else
        {
            e.currentTarget.querySelector(".confirmation-popup").innerHTML = "Logg inn for å legge<br>til i handlekurven";
            e.currentTarget.querySelector(".confirmation-popup").classList.add("error-background");

            setTimeout(() =>
            {
                e.currentTarget.querySelector(".confirmation-popup").innerHTML = "Lagt til i handlekurven";
                e.currentTarget.querySelector(".confirmation-popup").classList.remove("error-background");
            }, 2250);
        }

        e.currentTarget.querySelector(".confirmation-popup").style.opacity = "1";
        setTimeout(() => e.currentTarget.querySelector(".confirmation-popup").style.opacity = "0", 2000);
    });
}

// Fetch product list on load
fetchProducts().then(() => loadProducts());

// Load user header
if (localStorage["user"])
{
    // Load UI
    document.querySelector("#header.right").innerHTML = `
        <img class="square" src="${user.profilePictureUrl}" alt="${user.firstName}">
        <a href="/profile" class="clean-text visible-hover"><p>${user.firstName} ${user.lastName}</p></a>
        <button id="logout-button" class="visible-hover button">Logg ut</button>
    `;

    // Add event listener
    $("#logout-button").click(() =>
    {
        localStorage.removeItem("user");
        window.location.reload();
    });
}

// Search field listener
$("#search").keyup(() =>
{
    loadProducts(products.filter(p => p.name.toLowerCase().includes(document.querySelector("#search").value.toLowerCase())));
});