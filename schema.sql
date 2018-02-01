DROP DATABASE IF EXISTS netflix;

CREATE DATABASE netflix;

\connect netflix;

CREATE SEQUENCE user_id_seq;

CREATE TABLE user_profile (
  user_id smallint NOT NULL DEFAULT nextval('user_id_seq'),
  profile_name VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  region VARCHAR(255) NOT NULL,
  preferences VARCHAR(255) NOT NULL,
)
ALTER SEQUENCE user_id_seq OWNED BY user_profile.user_id;
