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