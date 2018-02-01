const db = require('./config.js');

class Users {
  static create({profile_name, password, email, region, preferences }) {
    const queryString = 'INSERT INTO users ( profile_name, password, email, region, preferences) VALUES ($1, $2, $3, $4, $5)';
    return db.any(queryString, [profile_name, password, email, region, preferences])
    .then( () => {console.log('USER CREATED'}))
    .catch((err) => { console.log('Err', err)});
  }
}
