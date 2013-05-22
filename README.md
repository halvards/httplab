# httplab

A lab exercise to explore HTTP caching headers.

The included `setup.sh` script will check for prerequisites and set up required software to run the lab exercise.

## Tips

To start the server, go to the `service` directory and run

    [service]$ npm start

The server will restart when any `.js` file in the `service` directory changes.

The client test script requires BrowserMob Proxy to be running. To start it, either use the `proxy.sh` script in the `client` directory or run

    [client]$ npm start

You can leave BrowserMob Proxy running between test script executions. However, when you want to shut it down, run

    [client]$ npm stop

To run the test script, go to the `client` directory and run

    [client]$ npm test

To view a HAR file, use the `har.sh` script in the `client` directory

    [client]$ ./har.sh twfake.har

## Squid (Advanced)

The client test script can be run against a [Squid](http://www.squid-cache.org/) caching reverse proxy rather than directly against the ExpressJS server. The `setup.sh` script doesn't install Squid, but it can be installed using [Homebrew](http://mxcl.github.io/homebrew/). A config file template can be found in the `service/config` directory.

## Troubleshooting

If you need to increase the timeout for your tests, look in the file `client/package.json`

To check out the code again, visit [GitHub](https://github.com/halvards/httplab)

## Links

HTTP Caching:

- The [Caching in HTTP](http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html) section of the [HTTP 1.1 specification](http://www.w3.org/Protocols/rfc2616/rfc2616.html)
- Mark Nottingham's [Caching Tutorial](http://www.mnot.net/cache_docs/)

The code:

- [NodeJS](http://nodejs.org/)
- [ExpressJS](http://expressjs.com/)
- [PhantomJS](http://phantomjs.org/)
- [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs)
- [BrowserMob Proxy](https://github.com/webmetrics/browsermob-proxy)
- [HAR Viewer](http://www.softwareishard.com/blog/har-viewer/)

