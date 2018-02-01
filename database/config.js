const pgp = require('pg-promise')();

const config = {
  host: 'localhost',
  port: 5432,
  database: 'netflix',
  user: 'calvinw',
  password: 'calvinwong',
};

const db = pgp(config);

module.exports = db;
