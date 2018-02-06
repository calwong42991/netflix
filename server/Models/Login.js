const db = require('../../database');

class Login {
  static login ({profile_name, password}) {
    return db.login.login(profile_name, password)
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => {
      console.log('ERROR', err);
      return err;
    })
  }
}
