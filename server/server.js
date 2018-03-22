'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const axios = require('axios');
const newrelic = require('newrelic');
const apiRouter = require('./apiRoutes');
//const cluster = require('cluster');
const cluster = require('express-cluster');
const os = require('os')


const app = express();

app.locals.newrelic = newrelic;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRouter)

if (cluster.isMaster) {

  const numWorkers = require('os').cpus().length;

  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(let i = 0; i < numWorkers; i++) {
    var worker = cluster.fork();

    worker.on('message', function(msg) {
      if (msg.cmd && msg.cmd == 'notifyRequest') {
        numReqs++;
      }
    });
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World')
    res.end();
  }).listen(8080);

}

module.exports = app;
