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
    return db.any(queryUpdate, [user_id])
    .then(() => {console.log('UPDATED')})
    .catch((err) => {console.log('ERROR', err)});
  }

  static getAllVideoSaved ({user_id}) {
    const queryGetAll = 'SELECT * FROM video_saved WHERE user_id = $1';
    return db.any(queryGetAll, [user_id])
      .then((data) => {
        const videoSaved = {videoSaved: data}
        return videoSaved
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }

  static index () {
    const query = 'CREATE INDEX video_saved_index on video_saved USING btree (user_id)';
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

module.exports = Saved;