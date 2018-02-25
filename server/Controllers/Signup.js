'use strict';

const models = require('../Models');

class Signup {
  static create (req, res) {
    const {user_id, profile_name, password, email, region, preferences} = req.body;
    models.signup.create({user_id, profile_name, password, email, region, preferences})
      .then(() => {
        console.log('Signed Up');
        res.send('Signed Up');
      })
      .catch((error) => {
        console.log('ERROR', error);
        res.send(error);
      })
  }
}

module.exports = Signup;
