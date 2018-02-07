const db = require('../../database');

class Signup {
  static create (data) {
    return db.user.create(data);
  }
}

module.exports = Signup;
