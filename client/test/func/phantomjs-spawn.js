// Copyright 2013 Halvard Skogsrud
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

module.exports = function () {
  var deferred = require('deferred')
    , spawn = require('child_process').spawn;

  var spawnTimeoutMillis = 2000; // block for this long to allow PhantomJS to start
  var phantomjs;

  return function (webdriverPort, proxyPort) {
    var defer = deferred();
    var start = function () {
      phantomjs = spawn('phantomjs', ['--webdriver=' + webdriverPort, '--proxy=localhost:' + proxyPort], {detached: false});
      setTimeout(function () {
        if (!phantomjs) {
          defer.reject(new Error('Could not start PhantomJS within ' + spawn + 'ms'));
        } else {
          defer.resolve(phantomjs);
        }
      }, spawnTimeoutMillis);
      return defer.promise;
    };

    var stop = function() {
      var defer = deferred();
      defer.resolve(phantomjs.kill());
      return defer.promise;
    };

    return {
      start: start,
      stop: stop
    };
  };
}();
