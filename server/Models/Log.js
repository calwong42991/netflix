const redis = require('../../Cache/redis.js');

class Log {
  static login (obj) {
    return redis.login(obj);
  }

  static logout(obj){
    return redis.logout(obj);
  }

  static getLog(){
    return redis.getLog();
  }
}

module.exports = Log;
