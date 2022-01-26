const urlBase = 'http://cops43319.xyz';

async function signIn() {

	const login = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	document.getElementById('loginResult').innerHTML = '';

	const res = await fetch('/LAMPAPI/LoginUser.php', {
		method: 'POST',
		body: JSON.stringify({ Login: login, Password: md5(password) }),
	});

	console.log('hashed pass=' + md5(password));

	if (!res.ok) {
		document.getElementById('loginResult').innerHTML = 'There was an error connecting to the server, try again later.';
	}

	const resJson = await res.json();

	if (resJson.error !== '') {

		document.getElementById('loginResult').innerHTML = 'User/Password combination incorrect';
		console.log('An error was encountered while trying to login.');
		console.log(resJson.error);

		return;

	} else {

		document.getElementById('loginResult').innerHTML = 'Sign in successful!';

		saveCookie({
			UserID: resJson.id,
			FirstName: resJson.firstName,
			LastName: resJson.lastName
		});

		window.location.href = urlBase + '/contacts.html';
	}
}

/* This is in case we weren't allowed to use `fetch(..)` forwhatever reason. It probably works. */
async function $fetch(uri, init) {

	const jsonPayload = init.body;
	const xhr = new XMLHttpRequest();

	xhr.open(init.method, uri, true);
	xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

	try {
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				resolve({
					ok: true,
					json: async () => JSON.parse(xhr.responseText),
				});
			}
		};

		xhr.send(jsonPayload);
	} catch (err) {
		resolve({
			ok: false,
			json: async () => reject(),
		});
	}
}

