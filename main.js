// Execution data
const api = "http://localhost:5241";

// Function for fetching product list from the API
async function loadProducts()
{
    const products = (await axios.get(`${api}/products/all`)).data;

    for (const product of products)
    {
        console.log(product);
        document.querySelector("#product-list").innerHTML += `
            <div class="product shadow rounded">
                <img class="slight-shadow rounded" src="${product.imageUrl}" alt="${product.name}">
                <div class="horizontal">
                    <h3>${product.name}</h3>
                    <!-- Format price nicely using https://stackoverflow.com/a/2901298 -->
                    <p><i>${product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</i></p>
                </div>
                <p>${product.description}</p>
                <p class="faded breathe-before"><i>${product.stock} på lager</i></p>
            </div>
        `;
    }
}

// Fetch product list on load
loadProducts().then(() => console.log("Loaded products"));