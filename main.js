async function loadProducts()
{
    const products = (await axios.get("http://localhost:5241/products/all")).data;

    for (const product of products)
    {
        console.log(product);
        document.querySelector("#product-list").innerHTML += `
            <tr>
                <td><img src="${product.imageUrl}" alt="${product.name}"></td>
                <td>${product.name}</td>
                <td>${product.price} kr</td>
                <td>${product.stock}</td>
            </tr>
        `;
    }
}

loadProducts();