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
    const queryAuth = `SELECT user_id FROM user_profile WHERE profile_name = $1 AND password = $2`;
    return db.any(queryAuth, [profile_name, password])
    .then((data) => {
      return data[0]
    })
    .catch((err) => {console.log('ERROR', err)});
  }

  static updateRegion(data) {
    const queryRegion = pgp.helpers.update(data, ['region'], 'user_profile') + ` WHERE user_id = $1`;
    return db.any(queryRegion, [data.user_id])
    .then(() => {console.log('UPDATED')})
    .catch((err) => {console.log('ERROR', err)});
  }

  static getVideoSaved({user_id}){
    const queryVideoSaved = `SELECT * FROM video_saved WHERE user_id = $1`;
    return db.any(queryVideoSaved, [user_id])
    .then((data) => {
      return data;
    })
    .catch((err) => {console.log(err)});
  }

  static getVideoWatched({user_id}){
    const queryVideoWatched = `SELECT video_id FROM video_watched WHERE user_id = $1`;
    return db.any(queryVideoWatched, [user_id])
    .then((data) => {
      return data
    })
    .catch((err) => {console.log(err)});
  }

  static login(obj) {
    this.updateRegion(obj),
    this.authenticate(obj)
    .then((userId) => {
      Promise.all([this.getVideoSaved(userId), this.getVideoWatched(userId)])
      .then((data) => {
        console.log('Data to send back to Client Facing Service ', data);
      })
      .catch((err) => {
        console.log('INNER ERROR')
        return err;
      })
    })
    .catch((err) => {
      console.log('OUTTER ERROR');
      return err;
    })
  }
}

module.exports = Login;
