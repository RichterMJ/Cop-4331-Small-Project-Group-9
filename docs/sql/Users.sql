
CREATE TABLE COP4331.Users
(
    -- Columns.
    ID                  INT NOT NULL AUTO_INCREMENT,
    DateCreated         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DateLastLoggedIn    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FirstName           VARCHAR(50) NOT NULL DEFAULT '',
    LastName            VARCHAR(50) NOT NULL DEFAULT '',
    Login               VARCHAR(50) NOT NULL DEFAULT '',
    Password            VARCHAR(50) NOT NULL DEFAULT '',

    -- Constraints.
    PRIMARY KEY (ID)

) ENGINE = InnoDB;

