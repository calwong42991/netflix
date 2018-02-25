'use strict';

const db = require('../../database');

class Save {
  static create({user_id, video_id, saved_time}) {
    return db.save.create({user_id, video_id, saved_time});
  }

  static updateSavedTime({user_id, video_id, saved_time}) {
    return db.save.updateSavedTime({user_id, video_id, saved_time});
  }

  static getAllVideoSaved({user_id}) {
    return db.save.getAllVideoSaved({user_id});
  }

  static index(){
    return db.save.index();
  }

}

module.exports = Save;
