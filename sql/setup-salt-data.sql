CREATE DATABASE TickorSalt;
GO
USE TickorSalt;
GO
CREATE TABLE UserPasswordSalt (
    username NVARCHAR (40) NOT NULL,
    salt NVARCHAR (32) NOT NULL
);
GO