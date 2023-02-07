CREATE DATABASE Tickor;
GO
USE Tickor;
GO
CREATE TABLE Client (
    id INT NOT NULL PRIMARY KEY,
    name NVARCHAR (40) NOT NULL,
    kind NVARCHAR (40) NOT NULL CHECK ( kind IN ('person', 'company'))
);

CREATE TABLE Person (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    email NVARCHAR (40) NOT NULL, 
    username NVARCHAR (40) NOT NULL, 
    kind NVARCHAR (40) NOT NULL CHECK ( kind IN ('administrator', 'robot', 'joe')),
    password_hash NVARCHAR (60) NOT NULL
    -- clientID INT NOT NULL FOREIGN KEY REFERENCES Client (id)
);

CREATE TABLE Project (
    id INT NOT NULL PRIMARY KEY,
    name NVARCHAR (40) NOT NULL,
    active BIT DEFAULT 0,
    clientID INT NOT NULL FOREIGN KEY REFERENCES Client (id)
);
CREATE TABLE Ticket (
    id INT NOT NULL PRIMARY KEY,
    name NVARCHAR (40) NOT NULL
);
GO
INSERT INTO Person (email, username, kind, password_hash) 
    VALUES ('admin@tickor.com', 'administrator', 'administrator', '');
INSERT INTO Person (email, username, kind, password_hash) 
    VALUES ('robot@tickor.com', 'robot', 'robot', 'robot711');
INSERT INTO Person (email, username, kind, password_hash) 
    VALUES ('jon@doe.com', 'jon', 'joe', 'jonode711');
GO