DROP DATABASE IF EXISTS netflix;

CREATE DATABASE netflix;

\connect netflix;

CREATE EXTENSION postgis;

CREATE TABLE IF NOT EXISTS user_profile (
  user_id SERIAL NOT NULL,
  profile_name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  region VARCHAR(50) NOT NULL,
  preferences VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS video_saved (
  user_id SERIAL NOT NULL,
  video_id INTEGER NOT NULL,
  saved_time VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS video_watched (
  user_id INTEGER NOT NULL,
  video_id INTEGER NOT NULL,
  rating FLOAT NOT NULL
);
