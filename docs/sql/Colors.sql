
CREATE TABLE COP4331.Colors
(
    -- Columns.
    ID      INT NOT NULL AUTO_INCREMENT,
    Name    VARCHAR(50) NOT NULL DEFAULT '',
    UserID  INT NOT NULL DEFAULT '0',

    -- Constraints.
    PRIMARY KEY (ID)

) ENGINE = InnoDB;

