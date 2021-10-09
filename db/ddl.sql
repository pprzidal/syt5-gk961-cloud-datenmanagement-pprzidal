DROP DATABASE IF EXISTS loginsystem;
CREATE DATABASE loginsystem;
\c loginsystem

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE, -- TODO constraint für länge (mindestens x zeichen)
    name VARCHAR(255), -- TODO constraint für länge (mindestens x zeichen)
    password VARCHAR(60)
);