const models = require('../Models');

class Login {
  static login(req, res) {
    const {profile_name, password} = req.body;
    models.login.authenticate({profile_name, password})
      .then((data) => {
        Promise.all([models.login.getVideoSaved(data), models.login.getVideoWatched(data)])
          .then((data) => {
            console.log(data);
            res.send(data);
          })
      })
      .catch((error) => {
        console.log('Error', error);
        res.send(err);
      })
  }
}

module.exports = Login;
