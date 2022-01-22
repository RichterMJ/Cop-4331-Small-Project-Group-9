let UserId, FirstName, LastName;
let lastestSearch = '';

const DEBUG = false;

window.onload = function() {
    if (DEBUG) {
        UserID    = 14;
        FirstName = 'Bill';
        LastName  = 'Marrow';

        document.getElementById('searchResults').innerHTML = convertContactsToTable(getMockContacts());
    } else {
        // So secure <3
        UserID = parseInt(getCookieVal('UserID'));
        FirstName = getCookieVal('FirstName');
        LastName = getCookieVal('LastName');
    }

    if (UserID == null) {
        window.location.href = '/';
    }

    document.getElementById('welcome').innerHTML = `Welcome, ${FirstName} ${LastName}`;

}

/* Who needs to escape data anyways? */
function convertContactsToTable(contacts) {
    return `
        <div class="forms text-center p-5">
			<table class="table thead-dark table-striped">
				<thead>
					<tr>
						<th style="width: 25%">Name</td>
						<th style="width: 25%">Phone number</td>
						<th style="width: 25%">Email</td>
						<th style="width: 10%"></td>
						<th style="width: 15%"></td>
					</tr>
				</thead>
				<tbody>
					${contacts.map(convertContactToTableRow).join('')}
				</tbody>
			</table>
		</div>
    `;
}

function convertContactToTableRow(contact) {
    return `
        <tr>
            <td style="width: 25%">${contact.Name}</td>
            <td style="width: 25%">${contact.PhoneNumber}</td>
            <td style="width: 25%">${contact.Email}</td>
            <td style="width: 10%">${generateUpdateButton(contact)}</td>
            <td style="width: 15%">${generateDeleteButton(contact)}</td>
        </tr>
    `;
}

function generateUpdateButton(contact) {
    return `
        <button type="button" class="btn btn-secondary btn-sm btn-block" onclick='editContact(${JSON.stringify(contact)})'>Edit</button>
    `;
}

function generateDeleteButton(contact) {
    return `
        <button type="button" class="btn btn-danger btn-sm btn-block" onclick="deleteContact(${contact.ID})">Delete</button>
    `;
}

function getMockContacts() {
    return [
        { ID: 1, Name: 'one', PhoneNumber: '111111', Email: 'one@one' },
        { ID: 2, Name: 'two', PhoneNumber: '222222', Email: 'two@two' },
        { ID: 3, Name: 'three', PhoneNumber: '333333', Email: 'three@three' },
        { ID: 4, Name: 'four', PhoneNumber: '444444', Email: 'four@four' },
    ];
}

function editContact(contact) {
    document.getElementById('editContactFormGoesHere').innerHTML = `
            <!-- Edit contact form. -->
            <form id="editContactForm" class="forms container text-center py-5">
                <h2 class="m-3">Edit Contact Form</h2>

                <div class="form-group mb-3 text-left">
                    <label for="editFromName">Name</label>

                    <div class="form-group row">
                        <label for="editFromName" class="col-sm-2 col-form-label">from</label>
                        <div class="col-sm-10"><input disabled type="text" class="form-control" id="editFromName" placeholder="Name" autofocus></div>
                    </div>

                    <div class="form-group row">
                        <label for="editToName" class="col-sm-2 col-form-label">to</label>
                        <div class="col-sm-10"><input type="text" class="form-control" id="editToName" placeholder="Name" autofocus></div>
                    </div>
                </div>

                <div class="form-group mb-3 text-left">
                    <label for="editFromPhonenumber">Phone Number</label>

                    <div class="form-group row">
                        <label for="editFromPhonenumber" class="col-sm-2 col-form-label">from</label>
                        <div class="col-sm-10"><input disabled type="text" class="form-control" id="editFromPhonenumber" placeholder="Phone Number" autofocus></div>
                    </div>

                    <div class="form-group row">
                        <label for="editToPhonenumber" class="col-sm-2 col-form-label">to</label>
                        <div class="col-sm-10"><input type="text" class="form-control" id="editToPhonenumber" placeholder="Phone Number" autofocus></div>
                    </div>
                </div>

                <div class="form-group mb-3 text-left">
                    <label for="editFromEmail">Email</label>

                    <div class="form-group row">
                        <label for="editFromEmail" class="col-sm-2 col-form-label">from</label>
                        <div class="col-sm-10"><input disabled type="text" class="form-control" id="editFromEmail" placeholder="Email" autofocus></div>
                    </div>

                    <div class="form-group row">
                        <label for="editToEmail" class="col-sm-2 col-form-label">to</label>
                        <div class="col-sm-10"><input type="text" class="form-control" id="editToEmail" placeholder="Email" autofocus></div>
                    </div>
                </div>

                <button type="button" class="btn btn-primary btn-lg btn-block" onclick="updateContact(${contact.ID})">Edit contact</button>
                <span id="addContactResult"></span>
            </form>
    `;

    document.getElementById('editFromName').value = contact.Name;
    document.getElementById('editFromPhonenumber').value = contact.PhoneNumber;
    document.getElementById('editFromEmail').value = contact.Email;

    document.getElementById('editToName').value = contact.Name;
    document.getElementById('editToPhonenumber').value = contact.PhoneNumber;
    document.getElementById('editToEmail').value = contact.Email;

    document.getElementById('editContactForm').scrollIntoView({ block: 'center',  behavior: 'smooth' });
}

/* Call the API to update a contact. Must supply `ContactID` as an argument. All other data is retrieved from the DOM */
async function updateContact(ContactID) {

    const Name = document.getElementById('editToName').value;
    const PhoneNumber = document.getElementById('editToPhonenumber').value;
    const Email = document.getElementById('editToEmail').value;

    const res = await fetch('LAMPAPI/UpdateContact.php', {
        method: 'POST',
        body: JSON.stringify({ ContactID, Name, PhoneNumber, Email }),
    });

    if (!res.ok) {
        document.getElementById('editResults').innerHTML = 'There was an error connecting to the server, try again later. No contacts deleted.';
    }

    const resJson = await res.json();

    if (resJson.error !== '') {
        document.getElementById('editResults').innerHTML = resJson.error;
    } else {
        searchContact(lastestSearch);
        document.getElementById('editContactFormGoesHere').innerHTML = '';
        document.getElementById('searchResults').scrollIntoView({ block: 'center',  behavior: 'smooth' });
    }
}

/* Call the API to delete a contact. Must supply `ContactID` as an argument. */
async function deleteContact(ContactID) {
    
    const res = await fetch('LAMPAPI/DeleteContact.php', {
        method: 'POST',
        body: JSON.stringify({ ContactID }),
    });

    if (!res.ok) {
        document.getElementById('searchResults').innerHTML = 'There was an error connecting to the server, try again later. No contacts deleted.';
    }

    const resJson = await res.json();

    if (resJson.error !== '') {
        document.getElementById('searchResults').innerHTML = resJson.error;
    } else {
        searchContact(lastestSearch);
    }
}

/* Call the API to search for contacts. Can either supply the search term or will automatically get from the DOM. */
async function searchContact(search) {

    if (typeof search === 'undefined')
        search = document.getElementById('searchQuery').value;

    lastestSearch = search;

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

/* Call the API to add a contact. Will automatically get data from the DOM. */
async function addContact() {

    const Name = document.getElementById('name').value;
    const PhoneNumber = document.getElementById('phoneNumber').value;
    const Email = document.getElementById('email').value;

    const res = await fetch('/LAMPAPI/CreateContact.php', {
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

