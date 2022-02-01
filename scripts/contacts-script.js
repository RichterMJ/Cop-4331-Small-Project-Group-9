
// Global vars to hold info on the currently logged in user.
let UserID, FirstName, LastName;

// Global vars to hold the latest query and its results.
let latestSearchQuery = '';
let latestSearchResults = null;

const DEBUG = false;

window.onload = function () {
	if (DEBUG) {
		UserID = 14;
		FirstName = 'MR';
		LastName = 'DEBUG';

		document.getElementById('searchResultsData').innerHTML = getMockContacts().map(convertContactToTableRow).join('');
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
		<div class="container text-center p-5 px-2">
			<div class="row p-1">
				<div class="col-2">Name</div>
				<div class="col-2">Phone #</div>
				<div class="col-4">Email</div>
				<div class="col-2 pt-2"></div>
				<div class="col-2 pt-2"></div>
			</div>
			<hr>
			<div>
				${contacts.map(convertContactToTableRow).join('')}
			</div>
		</div>
	`;
}

function generateContactHtmlId(ContactID) {
	return `contact_row_${ContactID}`;
}

function convertContactToTableRow(contact) {
	return `
		<div id="${generateContactHtmlId(contact.ID)}" class="contacts row p-1">
			<div class="col-5 col-sm-2">${contact.Name}</div>
			<div class="col-2 col-sm-2">${contact.PhoneNumber}</div>
			<div class="col-5 col-sm-4">${contact.Email}</div>
			<div class="offset-2 col-4 offset-sm-0 col-sm-2 py-2">${generateUpdateButton(contact)}</div>
			<div class="col-4 offset-sm-0 col-sm-2 py-2">${generateDeleteButton(contact)}</div>
		</div>
	`;
}

function generateUpdateButton(contact) {
	return `
		<button class="btn btn-sm btn-block btn-outline-light btn-info" onclick='editContact(${JSON.stringify(contact)})'>Edit</button>
	`;
}

function generateDeleteButton(contact) {
	return `
		<button class="btn btn-sm btn-block btn-outline-light btn-danger" onclick="deleteContact(${contact.ID})">Delete</button>
	`;
}

function getMockContacts() {
	return [
		{ ID: 1, Name: 'one', PhoneNumber: '111111', Email: 'one@one' },
		{ ID: 2, Name: 'two', PhoneNumber: '222222', Email: 'two@two' },
		{ ID: 3, Name: 'three', PhoneNumber: '333333', Email: 'three@three' },
		{ ID: 4, Name: 'four', PhoneNumber: '444444', Email: 'four@four' },
		{ ID: 5, Name: 'one', PhoneNumber: '111111', Email: 'one@one' },
		{ ID: 6, Name: 'two', PhoneNumber: '222222', Email: 'two@two' },
		{ ID: 7, Name: 'three', PhoneNumber: '333333', Email: 'three@three' },
		{ ID: 8, Name: 'four', PhoneNumber: '444444', Email: 'four@four' },
		{ ID: 9, Name: 'one', PhoneNumber: '111111', Email: 'one@one' },
		{ ID: 10, Name: 'two', PhoneNumber: '222222', Email: 'two@two' },
		{ ID: 11, Name: 'three', PhoneNumber: '333333', Email: 'three@three' },
		{ ID: 12, Name: 'four', PhoneNumber: '444444', Email: 'four@four' },
		{ ID: 13, Name: 'one', PhoneNumber: '111111', Email: 'one@one' },
		{ ID: 14, Name: 'two', PhoneNumber: '222222', Email: 'two@two' },
		{ ID: 15, Name: 'three', PhoneNumber: '333333', Email: 'three@three' },
		{ ID: 16, Name: 'four', PhoneNumber: '444444', Email: 'four@four' },
		{ ID: 17, Name: 'one', PhoneNumber: '111111', Email: 'one@one' },
		{ ID: 18, Name: 'two', PhoneNumber: '222222', Email: 'two@two' },
		{ ID: 19, Name: 'three', PhoneNumber: '333333', Email: 'three@three' },
		{ ID: 20, Name: 'four', PhoneNumber: '444444', Email: 'four@four' },
	];
}

function editContact(contact) {
	document.getElementById('editContactFormGoesHere').innerHTML = `
			<!-- Edit contact form. -->
			<form id="editContactForm" class="forms container text-center py-5">
				<h2 class="m-3">Edit Contact Form</h2>
				<span id="editErrorMessage" class="error-message"></span>
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

				<button id="editResults" type="button" class="btn btn-primary btn-outline-light btn-lg btn-block" onclick="updateContact(${contact.ID})">Edit</button>
				<button type="button" class="btn btn-info btn-outline-light btn-lg btn-block" onclick="cancelEditContact(${contact.ID})">Cancel</button>

				<span id="addContactResult"></span>
			</form>
	`;
 
	document.getElementById('editFromName').value = contact.Name;
	document.getElementById('editFromPhonenumber').value = contact.PhoneNumber;
	document.getElementById('editFromEmail').value = contact.Email;

	document.getElementById('editToName').value = contact.Name;
	document.getElementById('editToPhonenumber').value = contact.PhoneNumber;
	document.getElementById('editToEmail').value = contact.Email;

	document.getElementById('editContactForm').scrollIntoView({ block: 'center', behavior: 'smooth' });
}

/* Call the API to update a contact. Must supply `ContactID` as an argument. All other data is retrieved from the DOM */
async function updateContact(ContactID) {

	const Name = document.getElementById('editToName').value;
	const PhoneNumber = document.getElementById('editToPhonenumber').value;
	const Email = document.getElementById('editToEmail').value;

	const fromInfo = {
		name: document.getElementById('editFromName').value,
		number: document.getElementById('editFromPhonenumber').value,
		email: document.getElementById('editFromEmail').value
	};

	const toInfo = {
		name: Name,
		number: PhoneNumber,
		email: Email
	};

	// If there is no change in info the edit form closes.
	if(JSON.stringify(fromInfo) === JSON.stringify(toInfo)) {
		cancelEditContact(ContactID);
	}
	else {
		const res = await fetch('LAMPAPI/UpdateContact.php', {
			method: 'POST',
			body: JSON.stringify({ ContactID, Name, PhoneNumber, Email }),
		});

		if (!res.ok) {
			document.getElementById('editErrorMessage').innerHTML = 'There was an error connecting to the server, try again later. No contacts deleted.';
		}

		const resJson = await res.json();

		if (resJson.error !== '') {
			document.getElementById('editResults').innerHTML = resJson.error;
		} else {
			searchContact(latestSearchQuery);
			document.getElementById('editContactFormGoesHere').innerHTML = '';
			document.getElementById(generateContactHtmlId(ContactID)).scrollIntoView({ block: 'center', behavior: 'smooth' });
		}
	}
}

function cancelEditContact(ContactID) {
	document.getElementById('editContactFormGoesHere').innerHTML = '';
	document.getElementById(generateContactHtmlId(ContactID)).scrollIntoView({ block: 'center', behavior: 'smooth' });
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
		searchContact(latestSearchQuery);
	}
}

/* Handle text input into the search bar. */
async function handleSearchQueryInput() {
	const searchQuery = document.getElementById('searchQuery').value;

	if (searchQuery !== '') {
		await searchContact(searchQuery);
	} else {
		document.getElementById('searchResultsData').innerHTML = '';
	}
}

/* Call the API to search for ALL contacts. */
async function fetchAllContacts() {
	await searchContact('');
}

/* Call the API to search for contacts. Can either supply the search term or will automatically get from the DOM. */
async function searchContact(search) {

	if (typeof search === 'undefined')
		search = document.getElementById('searchQuery').value;

	latestSearchQuery = search;

	const res = await fetch('/LAMPAPI/SearchContacts.php', {
		method: 'POST',
		body: JSON.stringify({ search, UserID }),
	});

	if (!res.ok) {
		document.getElementById('searchResultsData').innerHTML = 'There was an error connecting to the server, try again later.';
	}

	const resJson = await res.json();

	if (resJson.error !== '') {
		document.getElementById('searchResultsData').innerHTML = resJson.error;
	} else {
		latestSearchResults = resJson.results;
		document.getElementById('searchResultsData').innerHTML = resJson.results.map(convertContactToTableRow).join('');
	}

}

/******************************************************************************
 * Create contact functions.
 ******************************************************************************/

/* Call the API to add a contact. Will automatically get data from the DOM. */
async function addContact() {

	const Name = document.getElementById('name').value;
	const PhoneNumber = document.getElementById('phoneNumber').value;
	const Email = document.getElementById('email').value;

	let anyErrs = false;

	if (!isValidName(Name)) {
		anyErrs = true;
		complainAboutNameMalformed();
	} else {
		uncomplainAboutNameMalformed();
	}

	if (!isValidPhoneNumber(PhoneNumber)) {
		anyErrs = true;
		complainAboutPhoneNumberMalformed();
	} else {
		uncomplainAboutPhoneNumberMalformed();
	}

	if (!isValidEmail(Email)) {
		anyErrs = true;
		complainAboutEmailMalformed();
	} else {
		uncomplainAboutEmailMalformed();
	}

	if (anyErrs) {
		return;
	}

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

	Name.value = '';
	PhoneNumber.value = '';
	Email.value = '';
}

function isValidName(Name) {
	// const namePattern = /^[a-zA-Z0-9 ]+$/;
	const namePattern = /^[a-zA-Z0-9 ]*[a-zA-Z0-9][a-zA-Z0-9 ]+$/;

	return Name.match(namePattern);
}

function isValidPhoneNumber(PhoneNumber) {
	const phonePattern = /^\d{10}$/;

	return PhoneNumber.match(phonePattern) || PhoneNumber === '';
}

function isValidEmail(Email) {
	const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

	return Email.match(emailPattern) || Email === '';
}

function complainAboutNameMalformed() {
	document.getElementById('nameComplainMalformed').innerHTML = 'Name cannot be blank and cannot contain special characters';
	document.getElementById('nameComplainMalformed').classList.add('d-block');
	document.getElementById('nameComplainMalformed').classList.remove('d-none');
	document.getElementById('name').classList.add('is-invalid');
}

function uncomplainAboutNameMalformed() {
	document.getElementById('nameComplainMalformed').innerHTML = '';
	document.getElementById('nameComplainMalformed').classList.add('d-none');
	document.getElementById('nameComplainMalformed').classList.remove('d-block');
	document.getElementById('name').classList.remove('is-invalid');
}

function handleNameValidation(Name) {
	if (Name == null)
		Name = document.getElementById('name').value;

	const isValid = isValidName(Name);
	
	if (isValid) {
		uncomplainAboutNameMalformed();
	} else {
		complainAboutNameMalformed();
	}

	return isValid;
}

function complainAboutPhoneNumberMalformed() {
	document.getElementById('phoneNumberComplainMalformed').innerHTML = 'Phone-number must be blank or be a 10-digit number in the form <i>xxxxxxxxxx</i>';
	document.getElementById('phoneNumberComplainMalformed').classList.add('d-block');
	document.getElementById('phoneNumberComplainMalformed').classList.remove('d-none');
	document.getElementById('phoneNumber').classList.add('is-invalid');
}

function uncomplainAboutPhoneNumberMalformed() {
	document.getElementById('phoneNumberComplainMalformed').innerHTML = '';
	document.getElementById('phoneNumberComplainMalformed').classList.add('d-none');
	document.getElementById('phoneNumberComplainMalformed').classList.remove('d-block');
	document.getElementById('phoneNumber').classList.remove('is-invalid');
}

function handlePhoneNumberValidation(PhoneNumber) {
	if (PhoneNumber == null)
		PhoneNumber = document.getElementById('phoneNumber').value;

	const isValid = isValidPhoneNumber(PhoneNumber);
	
	if (isValid) {
		uncomplainAboutPhoneNumberMalformed();
	} else {
		complainAboutPhoneNumberMalformed();
	}

	return isValid;
}

function complainAboutEmailMalformed() {
	document.getElementById('emailComplainMalformed').innerHTML = 'Email must be blank or in the form <i>xxx@xxx.xxx</i>';
	document.getElementById('emailComplainMalformed').classList.add('d-block');
	document.getElementById('emailComplainMalformed').classList.remove('d-none');
	document.getElementById('email').classList.add('is-invalid');
}

function uncomplainAboutEmailMalformed() {
	document.getElementById('emailComplainMalformed').innerHTML = '';
	document.getElementById('emailComplainMalformed').classList.add('d-none');
	document.getElementById('emailComplainMalformed').classList.remove('d-block');
	document.getElementById('email').classList.remove('is-invalid');
}

function handleEmailValidation(Email) {
	if (Email == null)
		Email = document.getElementById('email').value;

	const isValid = isValidEmail(Email);
	
	if (isValid) {
		uncomplainAboutEmailMalformed();
	} else {
		complainAboutEmailMalformed();
	}

	return isValid;
}

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

