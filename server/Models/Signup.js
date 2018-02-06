const db = require('../../database');

class signup {
  static create (data) {
    return db.user.create(data)
    .then(() => {
      var message = 'You signed up';
      return message;
    })
    .catch(err => {
      console.log('ERROR', err);
      return err;
    })
  }
}
