DROP DATABASE IF EXISTS loginsystem;
CREATE DATABASE loginsystem;
\c loginsystem

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(60) -- TODO: passwort mit bcrypt eig. nur 60 Zeichen lang ändern
);