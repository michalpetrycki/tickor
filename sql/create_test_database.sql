CREATE DATABASE TickorTest;
GO
USE TickorTest;
GO

CREATE TABLE Client (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    name NVARCHAR (40) NOT NULL,
    kind NVARCHAR (40) NOT NULL CHECK ( kind IN ('person', 'company')),
    logo NVARCHAR (480) NULL
);

CREATE TABLE Person (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    email NVARCHAR (40) NOT NULL, 
    username NVARCHAR (40) NOT NULL, 
    kind NVARCHAR (40) NOT NULL CHECK ( kind IN ('administrator', 'robot', 'joe'))
    -- clientID INT NOT NULL FOREIGN KEY REFERENCES Client (id)
);

CREATE TABLE Project (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (40) NOT NULL,
    active BIT DEFAULT 0,
    logo NVARCHAR (480),
    clientID INT NOT NULL FOREIGN KEY REFERENCES Client (id)
);

CREATE TABLE IssueCategory (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (40) NOT NULL
);

CREATE TABLE IssueStatus (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (40) NOT NULL
);

CREATE TABLE Issue (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    statusID INT FOREIGN KEY REFERENCES IssueStatus (id),
    subject NVARCHAR (200),
    updated NVARCHAR (19),
    name NVARCHAR (40) NOT NULL,
    categoryID INT FOREIGN KEY REFERENCES IssueCategory (id)
);

CREATE TABLE Company (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (120) NOT NULL,
    kind NVARCHAR (40) NOT NULL CHECK ( kind IN ('company', 'contractor', 'customer'))
);
