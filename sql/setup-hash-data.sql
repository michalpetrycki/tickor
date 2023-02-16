CREATE DATABASE TickorHash;
GO
USE TickorHash;
GO
CREATE TABLE UserPasswordSalt (
    id INT NOT NULL PRIMARY KEY,
    username NVARCHAR (40) NOT NULL,
    password_hash NVARCHAR (40) NOT NULL
);
GO