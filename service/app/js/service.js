#!/usr/bin/env node

var express = require('express')
  , sleep = require('sleep');

var app = express();
app.configure(function () {
  app.use(express.logger("dev"));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.enable('trust proxy');
});

var location = 'app/static';

// Hello World, for experimentation
app.get('/hello', function (request, response) {
  response.set('Content-Type', 'text/plain');
  response.send('Hello World');
});

// Serve files from the app/static directory
app.get(/.*?/, function (request, response) {
//  sleep.usleep(500 * 1000); // microseconds, to simulate a slow server
//  response.setHeader('Cache-Control', 'public, max-age=3600');
  response.sendfile(location + request.path);
});

var port = 8000;
app.listen(port);
console.log('Server listening on port ' + port);

