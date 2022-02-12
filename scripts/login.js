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
    document.querySelector("#incorrect").innerHTML = "";

    // Store credentials
    const username = document.querySelector("#username").value;
    const passphrase = document.querySelector("#passphrase").value;

    try
    {
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

        if (success)
        {
            // Store user details
            localStorage["user"] = JSON.stringify((await axios({
                method: "get",
                url: `${api}/users`,
                headers: {
                    token: result
                }
            })).data);

            // Redirect to front page
            window.location.replace("/");
        }
        // Unsuccessful login
        else document.querySelector("#incorrect").innerHTML = "Feil brukernavn eller passord";
    }
    catch // The API responds with an error
    {
        document.querySelector("#incorrect").innerHTML = "Vennligst fyll inn alle feltene";
    }
});
