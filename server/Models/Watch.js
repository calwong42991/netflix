const db = require('../../database');

class Watch {
  static create({user_id, video_id, rating}) {
    return db.watch.create({user_id, video_id, rating});
  }

  static updateRating({user_id, video_id, rating}) {
    return db.watch.updateRating({user_id, video_id, rating});
  }

  static getAllVideoWatched({user_id}) {
    return db.watch.getAllVideoWatched({user_id});
  }
}

module.exports = Watch;
