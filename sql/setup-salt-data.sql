CREATE DATABASE TickorSalt;
GO
USE TickorSalt;
GO
CREATE TABLE UserPasswordSalt (
    id INT NOT NULL PRIMARY KEY,
    username NVARCHAR (40) NOT NULL,
    password_salt NVARCHAR (32) NOT NULL
);
GO