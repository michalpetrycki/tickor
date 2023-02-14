CREATE DATABASE TickorHash;
GO
USE TickorHash;
GO
CREATE TABLE UserPasswordSalt (
    username NVARCHAR (40) NOT NULL,
    password_hash NVARCHAR (40) NOT NULL
);
GO