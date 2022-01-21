const urlBase = 'http://cops43319.xyz';

// ???
let userId = 0;
let firstName = '';
let lastName = '';

function signIn()
{
    const login = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    document.getElementById('loginResult').innerHTML = '';

    const jsonPayload = JSON.stringify({
        Login: login,
        Password: md5(password),
    });

    const loginAPI = urlBase + '/LAMPAPI/Login.php'

    const xhr = new XMLHttpRequest();
    xhr.open('POST', loginAPI, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    try {
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const res = JSON.parse(xhr.responseText);

                if (res.error !== '') {
                    document.getElementById('loginResult').innerHTML = 'User/Password combination incorrect';
                    console.log('An error was encountered while trying to login.');
                    return;
                }

                saveCookie({ UserID: res.id, FirstName: res.firstName, LastName: res.lastName });
                window.location.href = urlBase + '/contacts.html';
            }
        };

        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById('loginResult').innerHTML = err.message;
        console.log('An error was CAUGHT while attempting login.');
    }
}

