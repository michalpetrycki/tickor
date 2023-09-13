CREATE DATABASE Tickor;
GO
USE Tickor;
GO

CREATE TABLE Client (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    name NVARCHAR (40) NOT NULL,
    kind NVARCHAR (40) NOT NULL CHECK ( kind IN ('person', 'company')),
    logo NVARCHAR (480) NULL,
    createdAt DATETIME2 CONSTRAINT DF_Client_CreatedAt DEFAULT (SYSDATETIME()),
    updatedAt Date NULL
);

CREATE TABLE Person (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    email NVARCHAR (40) NOT NULL, 
    username NVARCHAR (40) NOT NULL, 
    kind NVARCHAR (40) NOT NULL CHECK ( kind IN ('administrator', 'robot', 'joe')),
    createdAt DATETIME2 CONSTRAINT DF_Person_CreatedAt DEFAULT (SYSDATETIME()),
    updatedAt Date NULL
    -- clientID INT NOT NULL FOREIGN KEY REFERENCES Client (id)
);

CREATE TABLE Project (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (40) NOT NULL,
    active BIT DEFAULT 0,
    logo NVARCHAR (480),
    clientID INT NOT NULL FOREIGN KEY REFERENCES Client (id),
    createdAt DATETIME2 CONSTRAINT DF_Project_CreatedAt DEFAULT (SYSDATETIME()),
    updatedAt Date NULL
);

CREATE TABLE IssueCategory (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (40) NOT NULL,
    createdAt DATETIME2 CONSTRAINT DF_Issue_Category_CreatedAt DEFAULT (SYSDATETIME()),
    updatedAt Date NULL
);

CREATE TABLE IssueStatus (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (40) NOT NULL,
    createdAt DATETIME2 CONSTRAINT DF_Issue_Status_CreatedAt DEFAULT (SYSDATETIME()),
    updatedAt Date NULL
);

CREATE TABLE Issue (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    statusID INT FOREIGN KEY REFERENCES IssueStatus (id),
    subject NVARCHAR (200),
    name NVARCHAR (40) NOT NULL,
    categoryID INT FOREIGN KEY REFERENCES IssueCategory (id),
    createdAt DATETIME2 CONSTRAINT DF_Issue_CreatedAt DEFAULT (SYSDATETIME()),
    updatedAt Date NULL
);
