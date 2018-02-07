const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('../database/index.js');
const newrelic = require('newrelic');
const redis = require('../Cache/redis.js');
const apiRouter = require('./apiRoutes');

const app = express();
app.locals.newrelic = newrelic;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('we here')
})

app.use('/api', apiRouter);

module.exports = app;

// var obj = {
//   user_id: 266118,
//   profile_name: 'Johnny_Kris49',
//   password: '5tnoFYg3OwG_q6q',
//   email: 'calwong@gmail.com',
//   region: 'North America',
//   preferences: 'comedy'
// }

// app.post('/signup', (req, res) => {
//   db.user.create(req.body)
//   .then(() => {
//     console.log('Signed UP');
//     res.send('Signed UP')
//   })
//   .catch((err) => {
//     console.log('Error', err);
//     res.send(err);
//   })
// })
//
// app.get('/login', (req, res) => {
//   db.login.authenticate(obj)
//   .then((data) => {
//     Promise.all([db.login.getVideoSaved(data), db.login.getVideoWatched(data)])
//     .then(data => {
//       console.log(data);
//       res.send(data);
//     })
//   })
//   .catch((err) => {
//     console.log('ERROR', err);
//     res.end(err);
//   })
// })
//
// app.get('/login/redis', (req, res) => {
//   redis.login(obj)
//   redis.getLog()
//   .then((data) => {
//     res.send(data);
//   })
//   .catch(err => {
//     console.log(err);
//     res.send(err);
//   })
// })
//
// app.get('/logout/redis', (req, res) => {
//   redis.logout(obj)
//   redis.getLog()
//   .then((data) => {
//     res.send(data);
//   })
//   .catch(err => {
//     console.log(err);
//     res.send(err);
//   })
// })
