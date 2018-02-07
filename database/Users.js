const db = require('./config.js');
const pgp = require('pg-promise')();

const cs = pgp.helpers.ColumnSet(['profile_name', 'password', 'email', 'region', 'preferences'], {table: 'user_profile' });

class Users {
  static create ({user_id, profile_name, password, email, region, preferences}) {
    const query = pgp.helpers.insert({user_id, profile_name, password, email, region, preferences}, cs);
    return db.any(query)
    .then(() => {console.log('INSERTED A NEW USER')})
    .catch((err) => {console.log('ERROR', err)});
  }

  static test ({user_id}) {
    const queryString = 'EXPLAIN ANALYZE SELECT * FROM user_profile WHERE user_id = $1 LIMIT 1';
    return db.any(queryString, [user_id])
    .then((data) => {console.log(data)})
    .catch((err) => {console.log('Error'. err)});
  }
}

module.exports = Users;
