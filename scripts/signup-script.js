const urlBase = 'http://cops43319.xyz/LAMPAPI';

// ???
let userId = 0;
let firstName = '';
let lastName = '';

// TODO Add MD5 hashing to the password.
function signUp()
{
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    document.getElementById('loginResult').innerHTML = '';

    let jsonPayload = JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
        Login: username,
        Password: password
    });

    let url = urlBase + '/createUsers.php'

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

    try {
        xhr.onreadystatechange = () => {
            if (this.readyState == 4 && this.status == 200) {
                let res = JSON.parse(xhr.responseText);
                let err = res.error;

                if (err !== '') {
                    document.getElementById('signupResult').innerHTML = 'There was an error in signing up.';
                    return;
                }

                // saveCookie();
                window.location.href = 'color.html'; // TODO Figure out what this is.
            }
        };

        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById('loginResult').innerHTML = err.message;
    }
}

