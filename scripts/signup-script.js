
function complainAboutMismatchedPasswords() {
	document.getElementById('password-repeat').classList.add('is-invalid');
}

function uncomplainAboutMismatchedPasswords() {
	document.getElementById('password-repeat').classList.remove('is-invalid');
}

function handlePasswordRepeatInput() {
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('password-repeat').value;

	if (password !== passwordRepeat) {
		complainAboutMismatchedPasswords();
	} else {
		uncomplainAboutMismatchedPasswords();
	}
}

async function signUp() {

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('password-repeat').value;

	if (password !== passwordRepeat) {
		complainAboutMismatchedPasswords();
		document.getElementById('signupResult').innerHTML = 'Passwords do not match!';
		return;
	}

	document.getElementById('signupResult').innerHTML = '';

    const res = await fetch('/LAMPAPI/CreateUser.php', {
        method: 'POST',
		body: {
			FirstName: firstName,
			LastName: lastName,
			Login: username,
			Password: md5(password),
		}
    });

    if (!res.ok) {
        document.getElementById('signupResult').innerHTML = 'There was an error connecting to the server, try again later.';
    }

    const resJson = await res.json();

    if (resJson.error !== '') {
        document.getElementById('signupResult').innerHTML = resJson.error;
    } else {
        document.getElementById('signupResult').innerHTML = 'Sign up successful!';
    }

    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

