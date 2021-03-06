'use strict';

const faker = require('faker');

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


const calculateResponseTimeDelta = (requestSpec, response, context, ee)  =>{
  // requestSpec will be the request spec for this response (currently always null)
  // response is a Request.js response object
  // context is the scenario context containing scenario variables
  // ee is an event emitter for this scenario that we can use to add custom stats to the report

  var responseTime = Number(response.headers['x-response-time'].split('ms')[0]);

  ee.emit('customStat', { stat: 'response_time', value: responseTime });
}



const generateUser = (context, events, done) => {
  const profile_name = faker.internet.userName();
  const password = faker.internet.password();
  const email = faker.internet.email();
  const region = faker.random.arrayElement([
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North America',
    'Australia',
    'South America'
  ]);
  const preferences = faker.random.arrayElement([
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
  ]);

  context.vars.profile_name = profile_name;
  context.vars.password = password;
  context.vars.email = email;
  context.vars.region = region;
  context.vars.preferences = preferences;

  return done();
}

const generateFakeLog = (context, events, done) => {
  const user_id = faker.random.number(10000000);
  const region = faker.random.arrayElement([
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North America',
    'Australia',
    'South America'
  ]);

  context.vars.user_id = user_id;
  context.vars.region = region;

  return done();
}

const generateVideoSaved = (context, events, done) => {
  const user_id = faker.random.number({min:1, max:10000000});
  const video_id = faker.random.number({min:1, max:10000000});
  const saved_time = `${faker.random.number({min:1, max:2})} hour ${faker.random.number({min:1, max:59})} min ${faker.random.number({min:1, max:59})} seconds`;


  context.vars.user_id = user_id;
  context.vars.video_id = video_id;
  context.vars.saved_time = saved_time;

  return done();
}

const generateVideoWatched = (context, events, done) => {
  const user_id = faker.random.number({min:1, max:10000000});
  const video_id = faker.random.number({min:1, max:10000000});
  const rating = faker.finance.amount(1,5,1);


  context.vars.user_id = user_id;
  context.vars.video_id = video_id;
  context.vars.rating = rating;

  return done();
}

module.exports = {
  generateUser,
  calculateResponseTimeDelta,
  generateFakeLog,
  generateVideoSaved,
  generateVideoWatched
}
