CREATE DATABASE Tickor;
GO
USE Tickor;
GO

CREATE TABLE Client (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    name NVARCHAR (40) NOT NULL,
    kind NVARCHAR (40) NOT NULL CHECK ( kind IN ('person', 'company')),
    logo NVARCHAR (480) NULL
);
GO

CREATE TRIGGER tr_client_insert
ON Client
AFTER INSERT
AS
BEGIN
    DECLARE @clientID int
    SELECT @clientID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (@clientID, NULL, NULL, NULL, NULL, NULL, 'create_client');
    PRINT 'Insert client trigger fired'
END
GO

CREATE TRIGGER tr_client_update
ON Client
AFTER UPDATE
AS
BEGIN
    DECLARE @clientID int
    SELECT @clientID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (@clientID, NULL, NULL, NULL, NULL, NULL, 'update_client');
    PRINT 'Update client trigger fired'
END
GO



CREATE TABLE Person (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    email NVARCHAR (40) NOT NULL, 
    username NVARCHAR (40) NOT NULL, 
    kind NVARCHAR (40) NOT NULL CHECK ( kind IN ('administrator', 'robot', 'joe'))
);
GO

CREATE TRIGGER tr_person_insert
ON Person
AFTER INSERT
AS
BEGIN
    DECLARE @personID int
    SELECT @personID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (NULL, @personID, NULL, NULL, NULL, NULL, 'create_person');
    PRINT 'Insert person trigger fired'
END
GO

CREATE TRIGGER tr_person_update
ON Person
AFTER UPDATE
AS
BEGIN
    DECLARE @personID int
    SELECT @personID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (NULL, @personID, NULL, NULL, NULL, NULL, 'update_person');
    PRINT 'Update person trigger fired'
END
GO



CREATE TABLE Project (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (40) NOT NULL,
    active BIT DEFAULT 0,
    logo NVARCHAR (480),
    clientID INT NOT NULL FOREIGN KEY REFERENCES Client (id),
    -- createdAt DATETIME2 CONSTRAINT DF_Project_CreatedAt DEFAULT (SYSDATETIME()),
    -- updatedAt Date NULL
);
GO

CREATE TRIGGER tr_project_insert
ON Project
AFTER INSERT
AS
BEGIN
    DECLARE @projectID int
    SELECT @projectID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (NULL, NULL, @projectID, NULL, NULL, NULL, 'create_project');
    PRINT 'Insert project trigger fired'
END
GO

CREATE TRIGGER tr_project_update
ON Project
AFTER UPDATE
AS
BEGIN
    DECLARE @projectID int
    SELECT @projectID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (NULL, NULL, @projectID, NULL, NULL, NULL, 'update_project');
    PRINT 'Update project trigger fired'
END
GO



CREATE TABLE IssueCategory (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (40) NOT NULL
);
GO

CREATE TRIGGER tr_issue_category_insert
ON IssueCategory
AFTER INSERT
AS
BEGIN
    DECLARE @categoryID int
    SELECT @categoryID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (NULL, NULL, NULL, NULL, @categoryID, NULL, 'create_issue_category');
    PRINT 'Insert issue category trigger fired'
END
GO

CREATE TRIGGER tr_issue_category_update
ON IssueCategory
AFTER UPDATE
AS
BEGIN
    DECLARE @categoryID int
    SELECT @categoryID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (NULL, NULL, NULL, NULL, @categoryID, NULL, 'update_issue_category');
    PRINT 'Update issue category trigger fired'
END
GO



CREATE TABLE IssueStatus (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (40) NOT NULL
);
GO

CREATE TRIGGER tr_issue_status_insert
ON IssueStatus
AFTER INSERT
AS
BEGIN
    DECLARE @statusID int
    SELECT @statusID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (NULL, NULL, NULL, NULL, NULL, @statusID, 'create_issue_status');
    PRINT 'Insert issue status trigger fired'
END
GO

CREATE TRIGGER tr_issue_status_update
ON IssueStatus
AFTER UPDATE
AS
BEGIN
    DECLARE @statusID int
    SELECT @statusID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (NULL, NULL, NULL, NULL, NULL, @statusID, 'update_issue_status');
    PRINT 'Update issue status trigger fired'
END
GO



CREATE TABLE Issue (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    statusID INT FOREIGN KEY REFERENCES IssueStatus (id),
    subject NVARCHAR (200),
    name NVARCHAR (40) NOT NULL,
    categoryID INT FOREIGN KEY REFERENCES IssueCategory (id),
    projectID INT FOREIGN KEY REFERENCES Project (id)
);
GO

CREATE TRIGGER tr_issue_insert
ON Issue
AFTER INSERT
AS
BEGIN
    DECLARE @issueID int
    SELECT @issueID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (NULL, NULL, NULL, @issueID, NULL, NULL, 'create_status');
    PRINT 'Insert issue trigger fired'
END
GO

CREATE TRIGGER tr_issue_update
ON Issue
AFTER UPDATE
AS
BEGIN
    DECLARE @issueID int
    SELECT @issueID = INSERTED.id FROM INSERTED

    INSERT INTO Activity (clientID, personID, projectID, issueID, issueCategoryID, issueStatusID, activityType)
        VALUES (NULL, NULL, NULL, @issueID, NULL, NULL, 'update_issue');
    PRINT 'Update issue trigger fired'
END
GO



CREATE TABLE Activity (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    clientID INT NULL FOREIGN KEY REFERENCES Client (id),
    personID INT NULL FOREIGN KEY REFERENCES Person (id),
    projectID INT NULL FOREIGN KEY REFERENCES Project (id),
    issueID INT NULL FOREIGN KEY REFERENCES Issue (id),
    issueCategoryID INT NULL FOREIGN KEY REFERENCES IssueCategory (id),
    issueStatusID INT NULL FOREIGN KEY REFERENCES IssueStatus (id),
    activityDate DATETIME2 CONSTRAINT DF_Activity_date DEFAULT (SYSDATETIME()),
    updated DATETIME2 NULL,
    activityType NVARCHAR (40) NOT NULL,
    activityDetails NVARCHAR (4000)
);
GO

CREATE TRIGGER tr_activity_update
ON Activity
AFTER UPDATE
AS
BEGIN
    DECLARE @activityID int
    SELECT @activityID = INSERTED.id FROM INSERTED

    UPDATE Activity
    SET updated = SYSDATETIME()
    WHERE id = @activityID

    PRINT 'Update activity trigger fired'
END
GO
