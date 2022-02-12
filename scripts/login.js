// Load correct form
if (window.location.search === "?new") // Sign up
{
    document.querySelector("h1").innerHTML = "Registrer";
    document.querySelector("#login-form").innerHTML = `
        <div>
            <label>
                <input id="first-name" placeholder="Fornavn">
            </label>
            <label>
                <input id="last-name" placeholder="Etternavn">
            </label>
        </div>
        <label>
            <input id="email" placeholder="E-postadresse">
        </label>
        <label>
            <input id="phone-number" placeholder="Tlf.nr." type="tel">
        </label>
        <div>
            <label>
                <input id="username" placeholder="Brukernavn">
            </label>
            <label>
                <input id="passphrase" placeholder="Passord" type="password">
            </label>
        </div>
        <button id="signup-button" class="visible-hover button">Registrer</button>
    `;
}
else // Log in
{
    document.querySelector("#login-form").innerHTML = `
        <label>
            <input id="username" placeholder="Brukernavn">
        </label>
        <label>
            <input id="passphrase" placeholder="Passord" type="password">
        </label>
        <button id="login-button" class="visible-hover button">Logg inn</button>
    `;
}

// Input field listeners
$("#first-name").keyup(e =>
{
    if (e.keyCode === 13) $("#last-name").focus();
});

$("#last-name").keyup(e =>
{
    if (e.keyCode === 13) $("#email").focus();
});

$("#email").keyup(e =>
{
    if (e.keyCode === 13) $("#phone-number").focus();
});

$("#phone-number").keyup(e =>
{
    if (e.keyCode === 13) $("#username").focus();
});

$("#username").keyup(e =>
{
    if (e.keyCode === 13) $("#passphrase").focus();
});

$("#passphrase").keyup(e =>
{
    if (e.keyCode === 13)
    {
        $("#login-button").click();
        $("#signup-button").click();
    }
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

// Signup button event listener
$("#signup-button").click(async function ()
{
    // Remove error display
    document.querySelector("#incorrect").innerHTML = "";

    // Store credentials
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const email = document.querySelector("#email").value;
    const phoneNumber = document.querySelector("#phone-number").value;
    const username = document.querySelector("#username").value;
    const passphrase = document.querySelector("#passphrase").value;

    try
    {
        // Create user
        const createResult = (await axios({
            method: "post",
            url: `${api}/users`,
            headers: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                username: username,
                passphrase: passphrase,
                profilePictureUrl: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            }
        })).data;

        // Get user
        const getResult = (await axios({
            method: "get",
            url: `${api}/auth`,
            headers: {
                user: username,
                pass: passphrase
            }
        })).data;

        // Store success
        const success = createResult === true && getResult !== "";
        console.log(success ? "Account creation successful" : "Something went wrong");

        if (success)
        {
            // Store user details
            localStorage["user"] = JSON.stringify((await axios({
                method: "get",
                url: `${api}/users`,
                headers: {
                    token: getResult
                }
            })).data);

            // Redirect to front page
            window.location.replace("/");
        }
        // Unsuccessful login
        else document.querySelector("#incorrect").innerHTML = "Noe gikk galt";
    }
    catch // The API responds with an error
    {
        document.querySelector("#incorrect").innerHTML = "Vennligst fyll inn alle feltene";
    }
});