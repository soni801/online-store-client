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
            const chosen = products[e.currentTarget.getAttribute("data-product-index")];
            let saved = false;

            for (const product of cart)
            {
                if (product.product.id === chosen.id)
                {
                    product.quantity++;
                    saved = true;
                }
            }

            if (!saved)
            {
                cart.push({
                    product: chosen,
                    quantity: 1
                });
            }

            localStorage["cart"] = JSON.stringify(cart);
            refreshCart();
        }
        else
        {
            e.currentTarget.querySelector(".popup").innerHTML = "Logg inn for å legge<br>til i handlekurven";
            e.currentTarget.querySelector(".popup").classList.add("error-background");

            setTimeout(() =>
            {
                e.currentTarget.querySelector(".popup").innerHTML = "Lagt til i handlekurven";
                e.currentTarget.querySelector(".popup").classList.remove("error-background");
            }, 2250);
        }

        e.currentTarget.querySelector(".popup").style.opacity = "1";
        setTimeout(() => e.currentTarget.querySelector(".popup").style.opacity = "0", 2000);
    });
}

// Function for refreshing cart button
function refreshCart()
{
    document.querySelector("#cart-button").innerHTML = `
        <span class="visible-hover button">Handlekurv (${cart.length})</span>
        <div class="popup rounded unset">${(() =>
        {
            let output = "";
            
            for (const product of cart)
            {
                output += `
                    <div class="horizontal">
                        <div class="horizontal">
                            <img class="square" src="${product.product.imageUrl}" alt="${product.product.name}">
                            <p>${product.product.name}</p>
                        </div>
                        <p>x${product.quantity}</p>
                    </div>
                `;
            }
            
            if (output === "") output = "Handlekurven din er tom.<br>Legg til et produkt,<br>og prøv igjen!";
            return output;
        })()}</div>
    `;
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
        <button id="cart-button" class="clean relative"></button>
        <button id="logout-button" class="visible-hover button">Logg ut</button>
    `;

    refreshCart();

    // Add event listeners
    $("#cart-button").click(e =>
    {
        let popupStyle = e.currentTarget.querySelector(".popup").style;
        popupStyle.opacity = popupStyle.opacity === "1" ? "0" : "1";
    });

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