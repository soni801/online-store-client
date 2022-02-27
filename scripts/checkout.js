// Load cart products
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

// Input field listeners
$("#address-name").keyup(e =>
{
    if (e.keyCode === 13) $("#address-line").focus();
});

$("#address-line").keyup(e =>
{
    if (e.keyCode === 13) $("#postal-number").focus();
});

$("#postal-number").keyup(e =>
{
    if (e.keyCode === 13) $("#postal-place").focus();
});

$("#postal-place").keyup(e =>
{
    if (e.keyCode === 13) $("#signup-button").click();
});
