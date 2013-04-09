'use strict';

var browsermobProxy = require('./browsermob-proxy')
  , expect = require('chai').expect
  , spawn = require('child_process').spawn
  , webdriver = require('selenium-webdriver');

xdescribe('ThoughtWorks.com home page', function () {
  var proxyControlPort = '9090';
  var proxyPort = '9091';
  var webdriverPort = '4444';

  var proxy = browsermobProxy(proxyControlPort, proxyPort);
  var driver;

  beforeEach(function (done) {
    spawn('phantomjs', ['--webdriver=4444', '--proxy=localhost:9091']).unref();
    proxy.start(function onSuccess() {
      driver = new webdriver.Builder().usingServer('http://localhost:' + webdriverPort + '/wd/hub').build();
      done();
    }, done);
  });

  afterEach(function (done) {
    proxy.stop('twhome', function onSuccess() {
      driver.quit();
      done();
    }, done);
  });

  it('should get homepage twice', function (done) {
    var url = 'http://www.thoughtworks.com/'
    driver.get(url)
      .then(function() { proxy.newPage(null, done); });
    driver.get(url)
      .then(function() { done(); });
  });
});
