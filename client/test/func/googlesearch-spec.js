'use strict';

var browsermobProxy = require('./browsermob-proxy')
  , expect = require('chai').expect
  , spawn = require('child_process').spawn
  , webdriver = require('selenium-webdriver');

xdescribe('Google Search', function () {
  var browsermobPort = '9090';
  var proxyPort = '9091'; // browsermob proxy port
  var webdriverPort = '4444';

  var proxy = browsermobProxy(browsermobPort, proxyPort);
  var driver;

  beforeEach(function (done) {
    spawn('phantomjs', ['--webdriver=4444', '--proxy=localhost:9091']).unref();
    proxy.start(function onSuccess() {
      driver = new webdriver.Builder().usingServer('http://localhost:' + webdriverPort + '/wd/hub').build();
      done();
    }, done);
  });

  afterEach(function (done) {
    proxy.stop('google', function onSuccess() {
      driver.quit();
      done();
    }, done);
  });

  it('should update title when searching', function (done) {
    driver.get('http://www.google.com.au/').
      then(function() { proxy.newPage(null, done); });
    driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
    driver.findElement(webdriver.By.name('btnG')).click();
    driver.getTitle().then(function (title) {
      expect(title).to.equal('webdriver - Google Search');
      console.log('title matched');
      done();
    });
  });
});
