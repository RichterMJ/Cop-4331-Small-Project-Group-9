const urlBase = 'https://127.0.0.1/Routes';

let userId = 0;
let firstName = "";
let lastName = "";

function signIn()
{
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	document.getElementById("loginResult").innerHTML = "";

	let tmp = { login:login, password:password };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/SignIn.php'

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")

	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;

				if(userId < 1)
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				// saveCookie();

				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}