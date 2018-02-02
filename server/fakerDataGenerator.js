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
   'comedy',
   'sci-fi',
   'horror',
   'drama',
   'thriller',
   'romance',
   'docuseries',
   'mystery'
];

/*
const randomPreferences = function(){
  var output = [];
  var count = faker.random.number({min:1, max:5});
  for(var i = 1; i < count; i++){
    output.push(faker.random.arrayElement(preferences));
  }
  return output;
}
*/

const generateUsers = function() {
  var fake = [];
  for(var i = 0; i < 500000; i++){
    var obj = {};
    obj.profile_name = faker.internet.userName();
    obj.password = faker.internet.password();
    obj.email = faker.internet.email();
    obj.region = faker.random.arrayElement(region);
    obj.preferences = faker.random.arrayElement(preferences);
    fake.push(obj);
  }

  db.Users.create(fake);
}


// const generateUsers = function() {
//   var user = [];
//   for(let i = 0; i < 10; i++){
//     let username = faker.internet.userName();
//     let password = faker.internet.password();
//     let email = faker.internet.email();
//     let countries = faker.random.arrayElement(region);
//     let preference = faker.random.arrayElement(preferences);
//     user.push([username, password, email, countries, preference]);
//   }
//
// }

generateUsers()

module.exports.generateUsers = generateUsers;
