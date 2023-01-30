CREATE DATABASE Tickor;
GO
USE Tickor;
GO
CREATE TABLE Person (
    id INT NOT NULL PRIMARY KEY,
    email NVARCHAR(40) NOT NULL, 
    login NVARCHAR(40) NOT NULL, 
    user_role NVARCHAR(40) NOT NULL CHECK ( user_role IN ('administrator', 'robot', 'joe')),
    password_hash NVARCHAR(40) NOT NULL
);
GO
INSERT INTO Person (id, email, login, user_role, password_hash) 
    VALUES (1, 'admin@tickor.com', 'administrator', 'administrator', 'abcd711');
INSERT INTO Person (id, email, login, user_role, password_hash) 
    VALUES (2, 'robot@tickor.com', 'robot', 'robot', 'robot711');
INSERT INTO Person (id, email, login, user_role, password_hash) 
    VALUES (3, 'jon@doe.com', 'jon', 'joe', 'jonode711');
GO