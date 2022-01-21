let UserId, FirstName, LastName;

window.onload = function() {
    UserID = parseInt(getCookieVal('UserID'));
    FirstName = getCookieVal('FirstName');
    LastName = getCookieVal('LastName');

    if (UserID == null) {
        window.location.href = '/';
    }

    document.getElementById('welcome').innerHTML = `Welcome, ${FirstName} ${LastName}`;
}

async function addContact() {

    const Name = document.getElementById('name').value;
    const PhoneNumber = document.getElementById('phoneNumber').value;
    const Email = document.getElementById('email').value;

    const res = await fetch('/LAMPAPI/createContacts.php', {
        method: 'POST',
        body: JSON.stringify({ Name, PhoneNumber, Email, UserID }),
    });

    if (!res.ok) {
        document.getElementById('addContactResult').innerHTML = 'There was an error connecting to the server, try again later.';
    }

    const resJson = await res.json();

    if (resJson.error !== '') {
        document.getElementById('addContactResult').innerHTML = resJson.error;
    } else {
        document.getElementById('addContactResult').innerHTML = 'Sign up successful!';
    }

    document.getElementById('name').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('email').value = '';
}

