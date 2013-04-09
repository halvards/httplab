// Reference: http://stackoverflow.com/a/10756441

'use strict';

module.exports = function () {
  var os = require('os');

  return function () {
    var networkIPs = function () {
      var interfaces = os.networkInterfaces();
      var addresses = [];
      console.log(interfaces);
      for (var networkInterface in interfaces) {
        for (var networkAddressIndex in interfaces[networkInterface]) {
          var addressEntry = interfaces[networkInterface][networkAddressIndex];
          if (addressEntry.family === 'IPv4' && !addressEntry.internal) {
            addresses.push(addressEntry.address);
          }
        }
      }
      return addresses;
    }

    return {
      networkIPs: networkIPs // returns an array of non-internal IPv4 addresses
    };
  }
}();
