const urlBase = 'http://cops43319.xyz';

async function signIn() {

    const login = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    document.getElementById('loginResult').innerHTML = '';


    const res = await fetch('/LAMPAPI/Login.php', {
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

        saveCookie({ UserID: resJson.id, FirstName: resJson.firstName, LastName: resJson.lastName });
        window.location.replace('/contacts.html');
    }


//    const jsonPayload = JSON.stringify({
//        Login: login,
//        Password: md5(password),
//    });
//
//    const loginAPI = urlBase + '/LAMPAPI/Login.php'
//
//    const xhr = new XMLHttpRequest();
//    xhr.open('POST', loginAPI, true);
//    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
//
//    try {
//        xhr.onreadystatechange = () => {
//            if (xhr.readyState == 4 && xhr.status == 200) {
//                const res = JSON.parse(xhr.responseText);
//
//                if (res.error !== '') {
//                    document.getElementById('loginResult').innerHTML = 'User/Password combination incorrect';
//                    console.log('An error was encountered while trying to login.');
//                    return;
//                }
//
//                saveCookie({ UserID: res.id, FirstName: res.firstName, LastName: res.lastName });
//                window.location.href = urlBase + '/contacts.html';
//            }
//        };
//
//        xhr.send(jsonPayload);
//    } catch (err) {
//        document.getElementById('loginResult').innerHTML = err.message;
//        console.log('An error was CAUGHT while attempting login.');
//    }
}

