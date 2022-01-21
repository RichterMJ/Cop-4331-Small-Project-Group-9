// TODO Add MD5 hashing to the password.
async function signUp() {

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const signupAPI = '/LAMPAPI/createUsers.php';

    const jsonPayload = JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
        Login: username,
        Password: password
    });

    const res = await fetch(signupAPI, {
        method: 'POST',
        body: jsonPayload,
    });

    if (!res.ok) {
        document.getElementById('signupResult').innerHTML = 'There was an error connecting to the server, try again later.';
    }

    const resJson = await res.json();

    if (resJson.error !== '') {
        document.getElementById('signupResult').innerHTML = res.error;
    } else {
        document.getElementById('signupResult').innerHTML = 'Sign up successful!';
    }

    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

