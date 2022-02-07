function complainAboutBlank(htmlId) {
	document.getElementById(`${htmlId}ComplainBlank`).innerHTML = 'Field cannot be blank.';
	document.getElementById(`${htmlId}ComplainBlank`).classList.add('d-block');
	document.getElementById(`${htmlId}ComplainBlank`).classList.remove('d-none');
	document.getElementById(htmlId).classList.add('is-invalid');
}

function uncomplainAboutBlank(htmlId) {
	document.getElementById(`${htmlId}ComplainBlank`).innerHTML = '';
	document.getElementById(`${htmlId}ComplainBlank`).classList.add('d-none');
	document.getElementById(`${htmlId}ComplainBlank`).classList.remove('d-block');
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
	document.getElementById('passwordRepeatComplainMismatched').innerHTML = 'Passwords do not match.';
	document.getElementById('passwordRepeatComplainMismatched').classList.add('d-block');
	document.getElementById('passwordRepeatComplainMismatched').classList.remove('d-none');
	document.getElementById('passwordRepeat').classList.add('is-invalid');
}

function uncomplainAboutMismatchedPasswords() {
	document.getElementById('passwordRepeatComplainMismatched').innerHTML = '';
	document.getElementById('passwordRepeatComplainMismatched').classList.add('d-none');
	document.getElementById('passwordRepeatComplainMismatched').classList.remove('d-block');
	document.getElementById('passwordRepeat').classList.remove('is-invalid');
}

function handlePasswordRepeatInput() {
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('passwordRepeat').value;

	if (password !== passwordRepeat) {
		complainAboutMismatchedPasswords();
	} else {
		uncomplainAboutMismatchedPasswords();
	}
}

async function signUp() {

    const FirstName = document.getElementById('firstName').value;
    const LastName = document.getElementById('lastName').value;
    const Login = document.getElementById('username').value;
    const Password = document.getElementById('password').value;
    const PasswordRepeat = document.getElementById('passwordRepeat').value;

	// add error styling class to  signupResult
	document.getElementById('signupResult').classList.add('error-message');

	let anyBlank = false;
	for (const htmlId of ['firstName', 'lastName', 'username', 'password']) {
		handleBlankCheck(htmlId);
		if (document.getElementById(htmlId).value === '') {
			complainAboutBlank(htmlId);
			anyBlank = true;
		}
		else {
			uncomplainAboutBlank(htmlId);
		}
	}

	// if (anyBlank) {
	// 	return;
	// }

	if (Password !== PasswordRepeat) {
		complainAboutMismatchedPasswords();
		return;
	}

	document.getElementById('signupResult').innerHTML = '';

    const res = await fetch('/LAMPAPI/CreateUser.php', {
        method: 'POST',
		body: JSON.stringify({ FirstName, LastName, Login, Password: md5(Password) }),
    });

    if (!res.ok) {
        document.getElementById('signupResult').innerHTML = 'There was an error connecting to the server, try again later.';
    }

    const resJson = await res.json();

    if (resJson.error !== '') {
        document.getElementById('signupResult').innerHTML = resJson.error;
    } else {
		document.getElementById('signupResult').classList.remove('error-message');
        document.getElementById('signupResult').innerHTML = 'Sign up successful!';
		setTimeout(() => {
			window.location.href = '/';
		}, 1200);
    }

    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

