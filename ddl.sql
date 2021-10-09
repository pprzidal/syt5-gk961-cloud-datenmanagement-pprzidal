DROP DATABASE IF EXISTS loginsystem;
CREATE DATABASE loginsystem;
\c loginsystem

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    password VARCHAR(60)
);