'use strict';

var browsermobProxy = require('./browsermob-proxy')
  , deferred = require('deferred')
  , expect = require('chai').expect
  , webdriver = require('selenium-webdriver');

xdescribe('Amazon.com home page', function () {
  var browsermobPort = '9090';
  var proxyPort = '9091'; // browsermob proxy port
  var webdriverPort = '4444';

  var proxy = browsermobProxy(browsermobPort, proxyPort);
  var driver;

  beforeEach(function (done) {
    proxy.start(function onSuccess() {
      driver = new webdriver.Builder().usingServer('http://localhost:' + webdriverPort + '/wd/hub').build();
      done();
    }, done);
  });

  afterEach(function (done) {
    proxy.stop('amazon', function onSuccess() {
      driver.quit();
      done();
    }, done);
  });

  it('should get homepage twice', function (done) {
    driver.get('http://www.amazon.com/')
      .then(function() { console.log('first'); })
      .then(function() { proxy.newPage(null, done); });
    driver.get('http://www.amazon.com/')
      .then(function() { console.log('second'); })
      .then(done);
  });
});