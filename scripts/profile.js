// Variables
let deletingTimer = 0;
let deletingCountdownInterval;

// Load user info
if (localStorage["user"])
{
    document.querySelector("#personalia img").src = `${user.profilePictureUrl}`;
    document.querySelector("#personalia img").alt = `${user.firstName} ${user.lastName}`;
    document.querySelector("#personalia div :nth-child(1)").innerHTML = `${user.firstName} ${user.lastName}`;
    document.querySelector("#personalia div :nth-child(2)").innerHTML = `${user.credentials.username}`;
    document.querySelector("#account-info :nth-child(2)").innerHTML = `<i>${user.email}</i>`;
    document.querySelector("#account-info :nth-child(6)").innerHTML = `<i>(+47) ${user.phoneNumber.toString().substring(0, 3)} ${user.phoneNumber.toString().substring(3, 5)} ${user.phoneNumber.toString().substring(5)}</i>`;
}

// Add event listener to delete button
$("#delete-button").click(async () =>
{
    if (deletingTimer === 0)
    {
        deletingTimer = 5;
        document.querySelector("#delete-button").innerHTML = `Trykk igjen for å bekrefte... ${deletingTimer}`;
        deletingCountdownInterval = setInterval(() =>
        {
            deletingTimer--;
            if (deletingTimer > 0) document.querySelector("#delete-button").innerHTML = `Trykk igjen for å bekrefte... ${deletingTimer}`;
            else
            {
                clearInterval(deletingCountdownInterval);
                document.querySelector("#delete-button").innerHTML = "Slett konto";
            }
        }, 1000);
    }
    else
    {
        document.querySelector("#incorrect").innerHTML = "";

        const success = (await axios({
            method: "delete",
            url: `${api}/users`,
            headers: {
                token: user.credentials.token
            }
        })).data;

        if (success)
        {
            localStorage.removeItem("user");
            window.location.replace("/");
        }
        else document.querySelector("#incorrect").innerHTML = "Noe gikk galt.";
    }
});

// Load orders
async function loadOrders()
{
    const result = (await axios.get(`${api}/orders/user?id=${user.id}`)).data;

    for (const order of result)
    {
        document.querySelector("#orders").innerHTML += `
            <div class="box">
                <div>
                    <h2>Ordrenr.</h2>
                    <h4>${order.id}</h4>
                    <br><br>
                    <h2>Total pris</h2>
                    <h4>${order.totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</h4>
                </div>
                <div>
                    <h2>Status</h2>
                    <h4>${order.status}</h4>
                    <br><br>
                    <h2>Bestillingstidspunkt</h2>
                    <h4>${new Date(order.timestamp).toLocaleString()}</h4>
                </div>
            </div>
        `;
    }
}

loadOrders().then(() => console.log("Loaded orders"));
