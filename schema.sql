DROP DATABASE IF EXISTS netflix;

CREATE DATABASE netflix;

\connect netflix;


CREATE TABLE IF NOT EXISTS user_profile (
  user_id SERIAL NOT NULL,
  profile_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  region VARCHAR(255) NOT NULL,
  preferences VARCHAR(255) NOT NULL
);
