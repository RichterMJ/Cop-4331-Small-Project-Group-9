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

/* Who needs to escape data anyways? */
function convertContactsToTable(contacts) {
    return `
        <table class="table thead-dark table-striped">
            <thead>
                <tr>
                    <th style="width: 33.33%">Name</td>
                    <th style="width: 33.33%">Phone number</td>
                    <th style="width: 33.33%">Email</td>
                </tr>
            </thead>
            <tbody>
                ${contacts.map(convertContactToTableRow).join('')}
            </tbody>
        </table>
    `;
}

function convertContactToTableRow(contact) {
    return `
        <tr>
            <td style="width: 33.33%">${contact.Name}</td>
            <td style="width: 33.33%">${contact.PhoneNumber}</td>
            <td style="width: 33.33%">${contact.Email}</td>
        </tr>
    `;
}

async function searchContact() {

    const search = document.getElementById('searchQuery').value;

    const res = await fetch('/LAMPAPI/SearchContacts.php', {
        method: 'POST',
        body: JSON.stringify({ search, UserID }),
    });

    if (!res.ok) {
        document.getElementById('searchResults').innerHTML = 'There was an error connecting to the server, try again later.';
    }

    const resJson = await res.json();

    if (resJson.error !== '') {
        document.getElementById('searchResults').innerHTML = resJson.error;
    } else {
        document.getElementById('searchResults').innerHTML = convertContactsToTable(resJson.results);
    }

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

