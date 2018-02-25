const db = require('./config.js');
const pgp = require('pg-promise')();
const streamRead = pgp.spex.stream.read;
const faker = require('faker');

const csUser = pgp.helpers.ColumnSet(['profile_name', 'password', 'email', 'region', 'preferences'], {table: 'user_profile' });
const csSaved = pgp.helpers.ColumnSet(['user_id','video_id', 'saved_time'], {table: 'video_saved' });
const csWatched = pgp.helpers.ColumnSet(['user_id', 'video_id', 'rating'], {table: 'video_watched' });

var region = [
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North America',
  'Australia',
  'South America'
];

var preferences = [
   'action',
   'international',
   'comedy',
   'sci-fi',
   'horror',
   'drama',
   'thriller',
   'romance',
   'docuseries',
   'mystery'
];

var fakeUser = function(t, pageIndex){
  let data = null;
  if (pageIndex < 1000) {
    data = [];
    for(var i = 0; i < 10000; i++){
      data.push({
        profile_name: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        region: faker.random.arrayElement(region),
        preferences: faker.random.arrayElement(preferences)
      })
    }
  }
  return Promise.resolve(data);
}

var fakeVideoSaved = function(t, pageIndex){
  let data = null;
  if (pageIndex < 1000) {
    data = [];
    for(var i = 0; i < 3000; i++){
      data.push({
        user_id: faker.random.number({min:1, max:10000000}),
        video_id: faker.random.number({min:1, max:10000000}),
        saved_time: `${faker.random.number({min:1, max:2})} hour ${faker.random.number({min:1, max:59})} min ${faker.random.number({min:1, max:59})} seconds`
      })
    }
  }
  return Promise.resolve(data);
}

var fakeVideoWatched = function(t, pageIndex){
  let data = null;
  if (pageIndex < 1000) {
    data = [];
    for(var i = 0; i < 3000; i++){
      data.push({
        user_id: faker.random.number({min:1, max:10000000}),
        video_id: faker.random.number({min:1, max:10000000}),
        rating: faker.finance.amount(1,5,1)
      })
    }
  }
  return Promise.resolve(data);
}

class Fake {
  static createUser() {
    db.tx('massive-insert', t => {
      return t.sequence(index => {
        return fakeUser(t, index)
        .then(data => {
          if(data){
            const query = pgp.helpers.insert(data, csUser);
            return t.none(query);
          }
        });
      });
    })
    .then((data) => {
      console.log('success, all fake user_profile data inserted');
      console.log(`Total batches: ${data.total}, Duration: ${data.duration}`);

      const queryString = 'CREATE INDEX user_profile_index ON user_profile USING btree (user_id);';
      return db.any(queryString)
      .then((data) => {console.log(data, 'user_profile_index created')})
      .catch((err) => { console.log('ERROR', err)})
    })
    .catch((err) => {
      console.log('error', err);
    })
  }

  static createVideoSaved() {
    db.tx('massive-insert', t => {
      return t.sequence(index => {
        return fakeVideoSaved(t, index)
        .then(data => {
          if(data){
            const query = pgp.helpers.insert(data, csSaved);
            return t.none(query);
          }
        });
      });
    })
    .then((data) => {
      console.log('success, all fake video_saved data inserted');
      console.log(`Total batches: ${data.total}, Duration: ${data.duration}`);

      const queryString = 'CREATE INDEX video_saved_index ON video_saved USING btree (user_id);';
      return db.any(queryString)
      .then((data) => {console.log(data, 'video_saved_index created')})
      .catch((err) => { console.log('ERROR', err)})

    })
    .catch((err) => {
      console.log('error', err);
    })
  }

  static createVideoWatched() {
    db.tx('massive-insert', t => {
      return t.sequence(index => {
        return fakeVideoWatched(t, index)
        .then(data => {
          if(data){
            const query = pgp.helpers.insert(data, csWatched);
            return t.none(query);
          }
        });
      });
    })
    .then((data) => {
      console.log('success, all fake video_watched data inserted');
      console.log(`Total batches: ${data.total}, Duration: ${data.duration}`);

      const queryString = 'CREATE INDEX video_watched_index ON video_watched USING btree (user_id);';
      return db.any(queryString)
      .then((data) => {console.log(data, 'video_watched_index created')})
      .catch((err) => { console.log('ERROR', err)})

    })
    .catch((err) => {
      console.log('error', err);
    })
  }
}

module.exports = Fake;

/*
const getNextData = function(t, index, data) {

  return new Promise((resolve, reject) => {
    if(index === 0){
      resolve({data, nextPageInfo: data});
    } else {
      resolve(null);
    }
  });
}

class Users {
  static create(arr) {
    db.task('massive-insert', t => {
      return t.sequence(index => {
        return getNextData(t, index, arr)
        .then((a) => {
          if(a){
            const query = pgp.helpers.insert(a.data, cs);
            return t.none(query).then(() => a.nextPageInfo);
          }
        });
      });
    })
    .then((data) => {
      console.log('success, all records inserted');
      console.log(`Total batches: ${data.total}, Duration: ${data.duration}`);
    })
    .catch((err) => {
      console.log('error', err);
    })
  }
}
*/

/*
class Users {
  static create(arr) {
    db.task('inserting-products', t => {
      const query = pgp.helpers.insert(arr, cs);
      return t.none(query);
    })
    .then(() => {
      console.log('success, all records inserted');
    })
    .catch((err) => {
      console.log('error', err);
    })
  }
}
*/
