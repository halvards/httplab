'use strict';

var browsermobProxy = require('./browsermob-proxy')
  , expect = require('chai').expect
  , netutil = require('./netutil')
  , phantomjsSpawn = require('./phantomjs-spawn')
  , seleniumWebdriver = require('selenium-webdriver');

describe('locally hosted version of ThoughtWorks.com', function () {
  var limitBandwidth = false; // set true and adjust parameters below to simulate a low-bandwidth, high latency connection
  var downstreamKbps = 64;
  var upstreamKbps = 64;
  var latencyMillis = 100;

  var testServerPort = '8000';  // without Squid proxy
  //var testServerPort = '80';  // with Squid proxy
  var testServerHostIP = netutil().networkIPs()[0]; // don't use 127.0.0.1 as this changes the behaviour

  var proxy = browsermobProxy('9090');
  var webdriver, phantomjs;

  beforeEach(function (done) {
    proxy.start()
      .then(function (proxyPort) {
        phantomjs = phantomjsSpawn(4444, proxyPort);
        phantomjs.start()
          .then(function () {
            webdriver = new seleniumWebdriver.Builder().usingServer('http://localhost:4444/wd/hub').build();
          })
          .then(proxy.limitBandwidth(limitBandwidth, downstreamKbps, upstreamKbps, latencyMillis))
          .then(function success() {
            done();
          }, function error(err) {
            phantomjs.stop();
            done(err);
          });
      });
  });

  afterEach(function (done) {
    phantomjs.stop()
      .then(proxy.stop('twfake'))
      .then(webdriver.quit())
      .then(function () { done(); }, function error(err) { done(err); });
  });

  it('home page retrieved twice', function (done) {
    var url = 'http://' + testServerHostIP + ':' + testServerPort + '/tw.html';
    webdriver.get(url)
      .then(function() { proxy.newPage(null, done); }, function error(err) { done(err); });
    webdriver.get(url)
      .then(function success() { done(); }, function error(err) { done(err); });
  });
});
