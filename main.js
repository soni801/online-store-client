async function loadProducts()
{
    const products = (await axios.get("http://localhost:5241/products/all")).data;

    for (const product of products)
    {
        console.log(product);
        document.querySelector("#product-list").innerHTML += `
            <div class="product">
                <img src="${product.imageUrl}" alt="${product.name}">
                <div class="horizontal">
                    <h3>${product.name}</h3>
                    <p><i>${product.price} kr</i></p>
                </div>
                <p>${product.description}</p>
                <p class="faded breathe-before"><i>${product.stock} på lager</i></p>
            </div>
        `;
    }
}

loadProducts().then(() => console.log("Loaded products"));