const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const axios = require('axios');
const db = require('../database/index.js');
const newrelic = require('newrelic');
const redis = require('../Cache/redis.js');
const apiRouter = require('./apiRoutes');
const cluster = require('cluster');
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
    //res.write('process ' + process.pid + ' says hello!');
    res.write('Hello World')
    res.end();
  }).listen(8080);
}

// function startServer(host, port) {
//   http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Nice to meet you at ' + host + ':' + port);
//   }).listen(port, host);
//
//   console.log('Warming up your server at ' + host + ':' + port);
// }
//
// startServer('localhost', 8000);
// startServer('localhost', 8001);
// startServer('localhost', 8002);
// startServer('localhost', 8003);
// startServer('localhost', 8004);
// startServer('localhost', 8005);
// startServer('localhost', 8006);
// startServer('localhost', 8007);


// const serve = port => {
//   // app.listen(port, () => {
//   //   console.log(`Listening on port ${port}...`);
//   // });
//   http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('process ' + process.pid + ' says hello!');
//     res.end();
//   }).listen(port);
// }
//
//   serve(8000);
//   serve(8001);
//   serve(8002);
//   serve(8003);
//   serve(8004);
//   serve(8005);
//   serve(8006);
//   serve(8007);

// const serve = port => {
//   // app.listen(port, () => {
//   //   console.log(`Listening on port ${port}...`);
//   // });
//   http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('process ' + process.pid + ' says hello!');
//     res.end();
//   }).listen(port);
// }
//
//   serve(8000);
//   serve(8001);
//   serve(8002);
//   serve(8003);
//   serve(8004);
//   serve(8005);
//   serve(8006);
//   serve(8007);



// const app = express();
// app.locals.newrelic = newrelic;
//
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
// app.use('/api', apiRouter)
//
// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('process ' + process.pid + ' says hello!');
//   res.end();
// }).listen(8080);

//
// if (cluster.isMaster) {
//     var cpus = require('os').cpus().length;
//
//     for (var i = 0; i < cpus; i++) {
//         cluster.fork();
//     }
//
//     cluster.on('fork', function(worker) {
//         console.log('worker:' + worker.id + " is forked");
//     });
//     cluster.on('online', function(worker) {
//         console.log('worker:' + worker.id + " is online");
//     });
//     cluster.on('listening', function(worker) {
//         console.log('worker:' + worker.id + " is listening");
//     });
//     cluster.on('disconnect', function(worker) {
//         console.log('worker:' + worker.id + " is disconnected");
//     });
//     cluster.on('exit', function(worker) {
//         console.log('worker:' + worker.id + " is dead");
//     });
//
// } else {
//     http.createServer(function(req, res) {
//       console.log('worker:' + cluster.worker.id + " going to send response ");
//       res.writeHead(200);
//       res.end("hello world. worker: " + cluster.worker.id);
//     }).listen(8080);
// }

    // http.createServer(function(req, res) {
    //   res.writeHead(200);
    //   res.end("hello world. worker ");
    // }).listen(8080);

// const serve = port => {
//   http.createServer(function(req, res) {
//     res.writeHead(200);
//     res.end("hello world." );
//   }).listen(port);
// }
//
//   serve(8000);
//   serve(8001);
//   serve(8002);
//   serve(8003);
//   serve(8004);
//   serve(8005);
//   serve(8006);
//   serve(8007);
module.exports = app;
