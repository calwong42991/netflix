DROP DATABASE IF EXISTS netflix;

CREATE DATABASE netflix;

connect netflix;

CREATE EXTENSION postgis;

CREATE TABLE IF NOT EXISTS user_profile (
  user_id SERIAL NOT NULL UNIQUE,
  profile_name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  region VARCHAR(50) NOT NULL,
  preferences VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS video_saved (
  user_id INTEGER NOT NULL REFERENCES user_profile(user_id),
  video_id INTEGER NOT NULL UNIQUE,
  saved_time VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS video_watched (
  user_id INTEGER NOT NULL REFERENCES user_profile(user_id),
  video_id INTEGER NOT NULL REFERENCES video_saved(video_id),
  rating FLOAT NOT NULL
);
