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
