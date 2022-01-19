
CREATE TABLE COP4331.Contacts
(
    -- Columns.
    ID                  INT NOT NULL AUTO_INCREMENT,
    DateCreated         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DateLastLoggedIn    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Name                VARCHAR(50) NOT NULL DEFAULT '',
    PhoneNumber         VARCHAR(50) NOT NULL DEFAULT '',
    Email               VARCHAR(50) NOT NULL DEFAULT '',
    UserID              INT NOT NULL DEFAULT '0',

    -- Constraints.
    PRIMARY KEY (ID)

) ENGINE = InnoDB;

