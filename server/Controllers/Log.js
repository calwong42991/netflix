const models = require('../Models');

class Log {
  static login(req, res) {
    const {user_id, region} = req.body;
    models.log.login({user_id, region}),
    models.log.getLog()
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      })
  }

  static logout(req, res){
    const {user_id, region} = req.body;
    models.log.logout({user_id, region}),
    models.log.getLog()
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      })
  }
}

module.exports = Log;
