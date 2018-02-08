const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const db = require('../database/index.js');
const newrelic = require('newrelic');
const redis = require('../Cache/redis.js');
const apiRouter = require('./apiRoutes');
const cluster = require('cluster');
const os = require('os')

if (cluster.isMaster) {

  const numWorkers = require('os').cpus().length;

  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });

// Code to run if we're in a worker process
} else {
  
  const app = express();
  app.locals.newrelic = newrelic;
  app.set('port', process.env.PORT || 8080);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    res.send('process ' + process.pid + ' says hello!').end();
  })

  app.use('/api', apiRouter)

  app.listen(app.get('port'), () => {
    console.log('Process ' + process.pid + ' is listening to all incoming requests');
  });
}
