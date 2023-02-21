CREATE DATABASE TickorHash;
GO
USE TickorHash;
GO
CREATE TABLE UserPasswordHash (
    id INT NOT NULL PRIMARY KEY,
    username NVARCHAR (40) NOT NULL,
    password_hash NVARCHAR (105) NOT NULL
);
GO