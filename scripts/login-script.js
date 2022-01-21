const urlBase = 'http://cops43319.xyz/LAMPAPI';

let userId = 0;
let firstName = '';
let lastName = '';

// TODO Add MD5 hashing to the password.
function signIn()
{
    let login = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    document.getElementById('loginResult').innerHTML = '';

    let jsonPayload = JSON.stringify({
        Login: login,
        Password: password
    });

    let url = urlBase + '/Login.php'

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

    try {
        xhr.onreadystatechange = () => {
            if (this.readyState == 4 && this.status == 200) {
                let res = JSON.parse(xhr.responseText);
                userId = res.id;

                if (userId < 1) {
                    document.getElementById('loginResult').innerHTML = 'User/Password combination incorrect';
                    return;
                }

                firstName = res.firstName;
                lastName = res.lastName;

                // saveCookie();
                window.location.href = 'color.html'; // TODO Figure out what this is.
            }
        };

        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById('loginResult').innerHTML = err.message;
    }
}

