const db = require('./config.js');
const pgp = require('pg-promise')();

const csSaved = pgp.helpers.ColumnSet(['user_id','video_id', 'saved_time'], {table: 'video_saved' });

class Saved {
  static create ({user_id, video_id, saved_time}) {
    const query = pgp.helpers.insert({user_id, video_id, saved_time}, csSaved);
    return db.any(query)
    .then(() => {console.log('new Video')})
    .catch((err) => {console.log('ERROR', err)});
  }

  static updateSavedTime({user_id, video_id, saved_time}) {
    const queryUpdate = pgp.helpers.update({user_id, video_id, saved_time}, ['saved_time'], 'video_saved') + ` WHERE user_id = $1`;
    return db.any(queryUpdate, [data.user_id])
    .then(() => {console.log('UPDATED')})
    .catch((err) => {console.log('ERROR', err)});
  }
}

module.exports = Saved;
