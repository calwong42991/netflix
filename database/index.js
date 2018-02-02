const db = require('./config.js');
const pgp = require('pg-promise')();

const cs = pgp.helpers.ColumnSet(['profile_name', 'password', 'email', 'region', 'preferences'], {table: 'user_profile' });


class Users {
  static create(arr) {
    db.task('inserting-products', t => {
      const query = pgp.helpers.insert(arr, cs);
      return t.none(query);
    })
    .then(() => {
      console.log('success, all records inserted');
    })
    .catch((err) => {
      console.log('error', err);
    })
  }
}

module.exports.Users = Users;
