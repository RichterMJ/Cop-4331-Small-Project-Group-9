
-- MySQL script to populate the table with example data.



-- To run: Log into a MySQL console and type:
-- ```
-- mysql> source ./Example.sql;
-- ```

INSERT INTO COP4331.Users
	(FirstName, LastName, Login, Password)
VALUES
	("Andrew", "Smith", "andr@example.com", "d8578edf8458ce06fbc5bb76a58c5ca4"), -- Password=md5("qwerty")
	("Robert", "Calle", "robe@example.com", "4fecb3e39508556c2d6ab197a4f3685c"), -- Password=md5("qwertyy")
	("Joseph", "Mears", "jose@example.com", "5f4dcc3b5aa765d61d8327deb882cf99"), -- Password=md5("password")
	("Elijah", "Perez", "elij@example.com", "482c811da5d5b4bc6d497ffa98491e38"), -- Password=md5("password123")
	("Samuel", "Brown", "samu@example.com", "d8578edf8458ce06fbc5bb76a58c5ca4"), -- Password=md5("qwerty")
	("Carter", "Clark", "cart@example.com", "d8578edf8458ce06fbc5bb76a58c5ca4"), -- Password=md5("qwerty")
	("Olivia", "Evans", "oliv@example.com", "d8578edf8458ce06fbc5bb76a58c5ca4"), -- Password=md5("qwerty")
	("Amelia", "Young", "amel@example.com", "d8578edf8458ce06fbc5bb76a58c5ca4"), -- Password=md5("qwerty")
	("Aubrey", "Baker", "aubr@example.com", "d8578edf8458ce06fbc5bb76a58c5ca4"), -- Password=md5("qwerty")
	("Hannah", "Scott", "hann@example.com", "d8578edf8458ce06fbc5bb76a58c5ca4"), -- Password=md5("qwerty")
;

INSERT INTO COP4331.Contacts
	(Name, PhoneNumber, Email, UserID)
VALUES
	("Robert Calle", "1234567890", "robe@example.com", 1),
    ("Joseph Mears", "1237654321", "jose@example.com", 1),
    ("Camila Lewis", "", "cami@example.com", 1),
    ("Elijah Perez", "4448231623", "elij@example.com", 1),
    ("Samuel Brown", "4443512393", "samu@example.com", 1),
    ("Carter Clark", "4445235255", "cart@example.com", 1),
    ("Olivia Evans", "4445123512", "oliv@example.com", 1),
	("Julian Lopez", "5551234238", "", 1),
    ("Amelia Young", "5558219358", "amel@example.com", 1),
    ("Aubrey Baker", "5557371773", "aubr@example.com", 1),
    ("Hannah Scott", "5552358239", "hann@example.com", 1),
;

