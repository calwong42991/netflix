const models = require('../Models');

class Login {
  static login(req, res) {
    const {profile_name, password} = req.body;
    models.login.authenticate({profile_name, password})
      .then((id) => {
        Promise.all([models.login.getVideoSaved(id), models.login.getVideoWatched(id), models.signup.getUser(id)])
          .then((data) => {
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
