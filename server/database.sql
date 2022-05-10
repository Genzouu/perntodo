CREATE DATABASE perntodo;

CREATE TABLE todo(
   todo_id SERIAL PRIMARY KEY,
   is_checked boolean,
   description VARCHAR(255),
   time VARCHAR(20)
);