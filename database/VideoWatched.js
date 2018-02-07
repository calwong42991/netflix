const db = require('./config.js');
const pgp = require('pg-promise')();

const csWatched = pgp.helpers.ColumnSet(['user_id', 'video_id', 'rating'], {table: 'video_watched' });

class Watched {
  static create ({user_id, video_id, rating}) {
    const query = pgp.helpers.insert({user_id, video_id, rating}, csSaved);
    return db.any(query)
    .then(() => {console.log('new Video')})
    .catch((err) => {console.log('ERROR', csWatched)});
  }

  static updateRating ({user_id, video_id, rating}) {
    const queryUpdate = pgp.helpers.update({user_id, video_id, rating}, ['rating'], 'video_watched') + ` WHERE user_id = $1`;
    return db.any(queryUpdate, [rating.user_id])
    .then(() => {console.log('UPDATED')})
    .catch((err) => {console.log('ERROR', err)});
  }

}

module.exports = Watched;
