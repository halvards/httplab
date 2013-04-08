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

  //app.use('/', express.static('app/static')); // Static files
});

var location = 'app/static';

// Serve .html and .htm files
app.get(/.*\.html?/, function (request, response) {
  response.sendfile(location + request.path);
});

// Serve .css files
app.get(/.*\.css/, function (request, response) {
  response.sendfile(location + request.path);
});

// Serve .js files
app.get(/.*\.js/, function (request, response) {
  response.sendfile(location + request.path);
});

// Serve .png files
app.get(/.*\.png/, function (request, response) {
//  sleep.usleep(500 * 1000); // microseconds
  response.sendfile(location + request.path);
});

// Serve .ico files
app.get(/.*\.ico/, function (request, response) {
  response.sendfile(location + request.path);
});

// Hello World
app.get('/hello', function (request, response) {
  response.set('Content-Type', 'text/plain');
  response.send('Hello World');
});

// This section must appear last
var port = 8000;
app.listen(port);
console.log('Service listening on port ' + port);
