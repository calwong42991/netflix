'use strict';

const models = require('../Models');

class Save {
  static create(req, res) {
    const {user_id, video_id, saved_time} = req.body;
    models.save.create({user_id, video_id, saved_time})
      .then(() => {
        console.log('Saved Video');
        res.send('Saved Video');
      })
      .catch((error) => {
        console.log('ERROR', error);
        res.send(error);
      })
  }

  static updateSavedTime(req, res) {
    const {user_id, video_id, saved_time} = req.body;
    models.save.updateSavedTime({user_id, video_id, saved_time})
      .then(() => {
        console.log('Updated Saved Video');
        res.send('Updated Saved Video');
      })
      .catch((error) => {
        console.log('ERROR', error);
        res.send(error);
      })
  }

  static getAllVideoSaved(req, res) {
    const {user_id} = req.body;
    models.save.getAllVideoSaved({user_id})
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        res.send(error);
      })
  }
}

module.exports = Save;
