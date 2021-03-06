const db = require('./config.js');
const pgp = require('pg-promise')();

const csWatched = pgp.helpers.ColumnSet(['user_id', 'video_id', 'rating'], {table: 'video_watched' });

class Watched {
  static create ({user_id, video_id, rating}) {
    const query = pgp.helpers.insert({user_id, video_id, rating}, csWatched);
    return db.any(query)
    .then(() => {console.log('new Video')})
    .catch((err) => {console.log('ERROR', csWatched)});
  }

  static updateRating ({user_id, video_id, rating}) {
    const queryUpdate = pgp.helpers.update({user_id, video_id, rating}, ['rating'], 'video_watched') + ` WHERE user_id = $1`;
    return db.any(queryUpdate, [user_id])
    .then(() => {console.log('UPDATED')})
    .catch((err) => {console.log('ERROR', err)});
  }

  static getAllVideoWatched ({user_id}) {
    const queryGetAll = 'SELECT * FROM video_watched WHERE user_id = $1';
    return db.any(queryGetAll, [user_id])
    .then((data) => {
      const videoWatched = {videoWatched: data}
      return videoWatched;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
  }

  static index () {
    const query = 'CREATE INDEX video_watched_index on video_watched USING btree (user_id)';
    return db.any(query, [user_id])
    .then((data) => {
      const User = {User: data};
      return User;
    })
    .catch((error) => {
      return error
    });
  }
}

module.exports = Watched;