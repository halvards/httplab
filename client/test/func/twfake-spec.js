'use strict';

var browsermobProxy = require('./browsermob-proxy')
  , deferred = require('deferred')
  , expect = require('chai').expect
  , netutil = require('./netutil')
  , webdriver = require('selenium-webdriver');

describe('locally hosted version of ThoughtWorks.com', function () {
  var testPort = '8000';
  var testHostIP = netutil().networkIPs()[0];
  console.log(testHostIP);

  var proxyControlPort = '9090';
  var proxyPort = '9091';
  var webdriverPort = '4444';

  var proxy = browsermobProxy(proxyControlPort, proxyPort);
  var driver;

  beforeEach(function (done) {
    proxy.start(function onSuccess() {
      driver = new webdriver.Builder().usingServer('http://localhost:' + webdriverPort + '/wd/hub').build();
      done();
    }, done);
  });

  afterEach(function (done) {
    proxy.stop('twfake', function onSuccess() {
      driver.quit();
      done();
    }, done);
  });

  it('home page retrieved twice', function (done) {
    var url = 'http://' + testHostIP + ':' + testPort + '/tw.html';
    driver.get(url)
      .then(function() { proxy.newPage(null, done); });
    driver.get(url)
      .then(function() { done(); });
  });
});
