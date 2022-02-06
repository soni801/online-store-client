// Execution data
const api = "http://localhost:5241";

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
                        <!-- Format price nicely using https://stackoverflow.com/a/2901298 -->
                        <p><i>${product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</i></p>
                    </div>
                    <p>${product.description}</p>
                </div>
                <div class="horizontal breathe-before">
                    <p class="faded"><i>${product.stock} på lager</i></p>
                    <span class="cart transition"></span>
                </div>
            </div>
        `;
    }

    $(".cart").load("/assets/icons/cart.svg");
}

// Fetch product list on load
loadProducts().then(() => console.log("Loaded products"));