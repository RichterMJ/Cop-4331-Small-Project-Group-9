function complainAboutBlank(htmlId) {
	document.getElementById('signupResult').innerHTML = 'One or more fields are blank.';
	document.getElementById(htmlId).classList.add('is-invalid');
}

function uncomplainAboutBlank(htmlId) {
	document.getElementById('signupResult').innerHTML = '';
	document.getElementById(htmlId).classList.remove('is-invalid');
}

function handleBlankCheck(htmlId) {
    const content = document.getElementById(htmlId).value;

	if (content === '') {
		complainAboutBlank(htmlId);
	} else {
		uncomplainAboutBlank(htmlId);
	}
}

function complainAboutMismatchedPasswords() {
		document.getElementById('signupResult').innerHTML = 'Passwords do not match.';
	document.getElementById('password-repeat').classList.add('is-invalid');
}

function uncomplainAboutMismatchedPasswords() {
	document.getElementById('signupResult').innerHTML = '';
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

	let anyBlank = false;
	for (const htmlId of ['firstName', 'lastName', 'username', 'password']) {
		handleBlankCheck(htmlId);
		if (document.getElementById(htmlId).value === '') {
			anyBlank = true;
		}
	}
	if (anyBlank) {
		document.getElementById('signupResult').innerHTML = 'One or more fields are blank.';
		return;
	}

	if (password !== passwordRepeat) {
		complainAboutMismatchedPasswords();
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

