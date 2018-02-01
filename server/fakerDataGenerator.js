const faker = require('faker');
const fs = require('file-system');
const db = require('../database/index.js');

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
   'comedies',
   'sci-fi',
   'horror',
   'dramas',
   'thriller',
   'romance',
   'docuseries',
   'mysteries'
];

const fakeData = function() {
  var fake = [];
  for(var i = 0; i < 10; i++){
    var obj = {};
    obj.profile_name = faker.internet.userName;
    obj.password = faker.internet.password;
    obj.email = faker.internet.email;
    obj.region = faker.random.arrayElement(region);
    obj.preferences = faker.random.arrayElement(preferences);
    fake.push(obj);
  }

  fake.forEach((user) => {
    db.Users.create(user)
  })
}

module.exports.fakeData = fakeData;
