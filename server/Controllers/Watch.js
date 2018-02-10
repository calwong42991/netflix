const models = require('../Models');

class Watch {
  static create(req, res) {
    const {user_id, video_id, rating} = req.body;
    models.watch.create({user_id, video_id, rating})
      .then(() => {
        console.log('New Video Watched');
        res.send('New Video Watched');
      })
      .catch((error) => {
        console.log('ERROR', error);
        res.send(error);
      })
  }

  static updateRating(req, res) {
    const {user_id, video_id, rating} = req.body;
    models.watch.updateRating({user_id, video_id, rating})
      .then(() => {
        console.log('Updated Video Watched Rating');
        res.send('Updated Video Watched Rating');
      })
      .catch((error) => {
        console.log('ERROR', error);
        res.send(error);
      })
  }

  static getAllVideoWatched(req, res) {
    const {user_id} = req.body;
    models.watch.getAllVideoWatched({user_id})
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        res.send(error);
      })
  }
}

module.exports = Watch;
