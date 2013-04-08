'use strict';

module.exports = function () {
  var fs = require('fs')
    , request = require('request');

  return function (browsermobPort, proxyPort) {
    if (!browsermobPort) browsermobPort = '8080';
    if (!proxyPort) proxyPort = '8081';
    var browsermobHost = 'http://localhost:' + browsermobPort + '/proxy/';

    var start = function (onSuccess, onError) {
      request.post(browsermobHost, {form: {port: proxyPort}}, function (err, response, body) {
        if (err && onError) return onError(err);
        request.put(browsermobHost + proxyPort + '/har', {form: {captureHeaders: true, captureContent: false, captureBinaryContent: false}}, function (err, response, body) {
          if (err && onError) return onError(err);
          if (onSuccess) return onSuccess(response);
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

    return {
      start: start,
      stop: stop,
      newPage: newPage
    };
  };
}();
