// Execution data
const api = "https://api.soni.yessness.com:5000";

// Function for fetching product list from the API
async function loadProducts()
{
    const products = (await axios.get(`${api}/products/all`)).data;

    for (const product of products)
    {
        document.querySelector("#product-list").innerHTML += `
            <div class="product shadow rounded invert-selection">
                <div class="info">
                    <img class="slight-shadow rounded" src="${product.imageUrl}" alt="${product.name}">
                    <div class="horizontal">
                        <h3>${product.name}</h3>
                        <p><i>${product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</i></p>
                    </div>
                    <p>${product.description}</p>
                </div>
                <div class="horizontal breathe-before">
                    <p class="faded"><i>${product.stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} på lager</i></p>
                    <span class="cart transition"></span>
                </div>
            </div>
        `;
    }

    $(".cart").load("/assets/icons/cart.svg");
}

// Input field listeners
$("#username").keyup(e =>
{
    if (e.keyCode === 13) $("#passphrase").focus();
});

$("#passphrase").keyup(e =>
{
    if (e.keyCode === 13) $("#login-button").click();
});

// Login button event listener
$("#login-button").click(async function ()
{
    // Remove error display
    document.querySelector("#incorrect").style.display = "none";

    // Store credentials
    const username = document.querySelector("#username").value;
    const passphrase = document.querySelector("#passphrase").value;

    // Make a request to the API
    const result = (await axios({
        method: "get",
        url: `${api}/auth`,
        headers: {
            user: username,
            pass: passphrase
        }
    })).data;

    // Store success
    const success = result !== "";
    console.log(success ? "Login successful" : "Incorrect username/password");

    // Store success and update UI
    if (success)
    {
        localStorage["token"] = result;
        window.location.replace("/");
    }
    else document.querySelector("#incorrect").style.display = "unset";
});

// Fetch product list on load
loadProducts().then(() => console.log("Loaded products"));

/* Resources
    - Number formatting: https://stackoverflow.com/a/2901298
 */