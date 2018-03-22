'use strict';

const db = require('../../database');

class Login {
  static authenticate ({profile_name, password}) {
    return db.login.authenticate({profile_name, password});
  }
  static updateRegion ({region, user_id}) {
    return db.login.updateRegion({region, user_id});
  }

  static getVideoSaved({user_id}) {
    return db.login.getVideoSaved({user_id});
  }

  static getVideoWatched({user_id}){
    return db.login.getVideoWatched({user_id});
  }
}

module.exports = Login;