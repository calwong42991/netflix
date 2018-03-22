'use strict';

const redis = require('../../Cache/redis.js');

class Log {
  static login ({user_id, region}) {
    return redis.login({user_id, region});
  }

  static logout({user_id, region}){
    return redis.logout({user_id, region});
  }

  static getLog(){
    return redis.getLog();
  }
}

module.exports = Log;