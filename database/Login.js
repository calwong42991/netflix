const db = require('./config.js');
const pgp = require('pg-promise')();

/*
const queryAuth = `SELECT user_id FROM user_profile WHERE profile_name = $1 AND password = $2`;
const queryRegion = pgp.helpers.update(data, ['region'], 'user_profile') + ` WHERE user_id = $1`;
const queryVideoSaved = `SELECT video_id, saved_time FROM video_saved WHERE user_id = $1`;
const queryVideoWatched = `SELECT video_id FROM video_watched WHERE user_id = $1`;
*/

class Login {
  static authenticate ({profile_name, password}) {
    const queryAuth = `EXPLAIN ANALYZE SELECT user_id FROM user_profile WHERE profile_name = $1 AND password = $2`;
    return db.any(queryAuth, [profile_name, password])
    .then((data) => {console.log(data)})
    .catch((err) => {console.log('ERROR', err)});
  }

  static updateRegion(data) {
    const queryRegion = pgp.helpers.update(data, ['region'], 'user_profile') + ` WHERE user_id = $1`;
    return db.any(queryRegion, [data.user_id])
    .then((data) => {console.log('UPDATED', data)})
    .catch((err) => {console.log('ERROR', err)});
  }

  static getVideoSaved({user_id}){
    const queryVideoSaved = `SELECT video_id, saved_time FROM video_saved WHERE user_id = $1`;
    return db.any(queryVideoSaved, [user_id])
    .then((data) => {console.log(data)})
    .catch((err) => {console.log(err)});
  }

  static getVideoWatched({user_id}){
    const queryVideoWatched = `SELECT video_id FROM video_watched WHERE user_id = $1`;
    return db.any(queryVideoWatched, [user_id])
    .then((data) => {console.log(data)})
    .catch((err) => {console.log(err)});
  }
}

module.exports = Login;
