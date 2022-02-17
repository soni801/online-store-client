for (const product of cart)
{
    document.querySelector("#cart-content").innerHTML +=`
        <div>
            <h3>${product.product.name}</h3>
            <p>Antall: ${product.quantity}</p>
        </div>
    `;

    if (cart.indexOf(product) !== cart.length - 1) document.querySelector("#cart-content").innerHTML += "<hr>";
}