const db = require('../../database');

class Signup {
  static create ({user_id, profile_name, password, email, region, preferences}) {
    return db.user.create({user_id, profile_name, password, email, region, preferences});
  }
}

module.exports = Signup;
