const db = require('./config.js');
const pgp = require('pg-promise')();
const streamRead = pgp.spex.stream.read;
const faker = require('faker');

const cs = pgp.helpers.ColumnSet(['profile_name', 'password', 'email', 'region', 'preferences'], {table: 'user_profile' });

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



var getNextData = function(t, pageIndex){
  let data = null;
  if (pageIndex < 10) {
    data = [];
    for(var i = 0; i < 10; i++){
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

class Users {
  static create() {
    db.tx('massive-insert', t => {
      return t.sequence(index => {
        return getNextData(t, index)
        .then(data => {
          if(data){
            const query = pgp.helpers.insert(data, cs);
            return t.none(query);
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

module.exports = Users;
