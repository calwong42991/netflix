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
