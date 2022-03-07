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
    if (e.keyCode === 13) $("#country").focus();
});

$("#country").keyup(e =>
{
    if (e.keyCode === 13) $("#buy-button").click();
});

$("#buy-button").click(async function ()
{
    const addressName = document.querySelector("#address-name").value;
    const addressLine = document.querySelector("#address-line").value;
    const postalNumber = document.querySelector("#postal-number").value;
    const country = document.querySelector("#country").value;

    let totalPrice = 0;
    for (const product of cart) totalPrice += product.product.price;

    const orderId = (await axios({
        method: "post",
        url: `${api}/orders/new`,
        data: {
            Token: user.credentials.token,
            TotalPrice: totalPrice,
            AddressName: addressName,
            AddressLine: addressLine,
            PostalNumber: postalNumber,
            Country: country
        }
    })).data;

    for (const product of cart) await axios.post(`${api}/orders/link?orderId=${orderId}&productId=${product.product.id}&quantity=${product.quantity}`);

    emptyCart();
    window.location.replace("/");
});
