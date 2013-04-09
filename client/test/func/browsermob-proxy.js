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
  var fs = require('fs')
    , request = require('request');

  return function (controlPort, proxyPortIfFixed) {
    var browsermobPort = controlPort ? controlPort : '8080';
    var proxyPort = proxyPortIfFixed;
    var browsermobHost = 'http://localhost:' + browsermobPort + '/proxy/';

    var start = function (onSuccess, onError) {
      var requestBody = proxyPort ? {form: {port: proxyPort}} : undefined;
      request.post(browsermobHost, requestBody, function (err, response, body) {
        if (err && onError) return onError(err);
        proxyPort = JSON.parse(body).port;
        request.put(browsermobHost + proxyPort + '/har', {form: {captureHeaders: true, captureContent: false, captureBinaryContent: false}}, function (err, response, body) {
          if (err && onError) return onError(err);
          if (onSuccess) return onSuccess(proxyPort);
        });
      });
    };

    var stop = function (filename, onSuccess, onError) {
      request.get(browsermobHost + proxyPort + '/har', function (err, response, body) {
        if (err && onError) return onError(err);
        fs.writeFileSync(filename + '.har', body, 'utf8');
        request.del(browsermobHost + proxyPort, function (err, response, body) {
          if (err && onError) return onError(err);
          if (onSuccess) return onSuccess(response);
        });
      });
    };

    var newPage = function (onSuccess, onError) {
      request.put(browsermobHost + proxyPort + '/har/pageRef', function (err, response, body) {
        if (err && onError) return onError(err);
        if (onSuccess) return onSuccess(response);
      });
    };

    var limitBandwidth = function (enable, downstreamKbps, upstreamKbps, latencyMillis, onSuccess, onError) {
      request.put(browsermobHost + proxyPort + '/limit',
                  {form: { downstreamKbps: downstreamKbps, upstreamKbps: upstreamKbps, latency:latencyMillis, enable: enable }},
                  function (err, response, body) {
        if (err && onError) return onError(err);
        if (onSuccess) return onSuccess(response);
      });
    };

    var unlimitBandwidth = function (downstreamKbps, upstreamKbps, latencyMillis) {
      request.put(browsermobHost + proxyPort + '/limit', {form: { enable: false }}, function (err, response, body) {
        if (err && onError) return onError(err);
        if (onSuccess) return onSuccess(response);
      });
    };

    return {
      start: start,
      stop: stop,
      newPage: newPage,
      limitBandwidth: limitBandwidth
    };
  };
}();
