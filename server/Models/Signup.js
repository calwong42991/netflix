'use strict';

const db = require('../../database');

class Signup {
  static create ({user_id, profile_name, password, email, region, preferences}) {
    return db.user.create({user_id, profile_name, password, email, region, preferences});
  }
  static getUser ({user_id}) {
    return db.user.getUser({user_id});
  }

  static index (){
    return db.user.index;
  }
}

module.exports = Signup;
