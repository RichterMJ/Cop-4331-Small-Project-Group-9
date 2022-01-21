const urlBase = 'http://cops43319.xyz';

// ???
let userId = 0;
let firstName = '';
let lastName = '';

// TODO Add MD5 hashing to the password.
function signIn()
{
    const login = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    document.getElementById('loginResult').innerHTML = '';

    const jsonPayload = JSON.stringify({
        Login: login,
        Password: password
    });

    const loginAPI = urlBase + '/LAMPAPI/Login.php'

    const xhr = new XMLHttpRequest();
    xhr.open('POST', loginAPI, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

    try {
        xhr.onreadystatechange = () => {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(xhr.responseText);

                if (res.id < 1) {
                    document.getElementById('loginResult').innerHTML = 'User/Password combination incorrect';
                    return;
                }

                // TODO Figure out if we actually need this.
                userId = res.id;
                firstName = res.firstName;
                lastName = res.lastName;

                // saveCookie();
                window.location.href = urlBase + '/contacts.html';
            }
        };

        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById('loginResult').innerHTML = err.message;
    }
}

