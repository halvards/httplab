'use strict';

var browsermobProxy = require('./browsermob-proxy')
  , deferred = require('deferred')
  , expect = require('chai').expect
  , netutil = require('./netutil')
  , webdriver = require('selenium-webdriver');

describe('locally hosted version of ThoughtWorks.com', function () {
  var limitBandwidth = false; // set true and adjust parameters below to simulate a low-bandwidth, high latency connection
  var downstreamKbps = 64;
  var upstreamKbps = 64;
  var latencyMillis = 100;

  var testPort = '8000';  // without Squid proxy
  //var testPort = '80';  // with Squid proxy
  var testHostIP = netutil().networkIPs()[0];
  var proxy = browsermobProxy('9090', '9091');
  var driver;

  beforeEach(function (done) {
    proxy.start(function onSuccess() {
      driver = new webdriver.Builder().usingServer('http://localhost:4444/wd/hub').build();
      if (limitBandwidth) {
        proxy.limitBandwidth(downstreamKbps, upstreamKbps, latencyMillis, done, done);
      } else {
        done();
      }
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
