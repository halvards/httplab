# httplab

## Tips

Any password is `vagrant`

To start the server, go to the `service` directory and run

    [client]$ npm start

To run the test script(s), go to the `client` directory and run

    [service]$ npm test

To view a HAR file, use the `har` command

    [client]$ har twfake.har

To switch keyboard control back to Mac OS, press the _left_ Command key once.

A HTTP 1.1 cache reference is available here: [http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html](http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html)



## Troubleshooting

If you need to increase the timeout for your tests, look in the file `client/package.json`

To check out the code again, visit [GitHub](https://github.com/halvards/httplab)

If you seem to lose network connectivity in the virtual machine, try disabling and re-enabling networking via the top
right hand menu bar icon.

Monitor the health of browsermob-proxy in `/var/log/browsermob-proxy.log`

There's no easy way to restart browsermob-proxy, you need to look for the process ID (PID) using `ps -ef` and use
`kill` to stop it. Run `/opt/browsermob-proxy/bin/browsermob-proxy --port 9090` to start it again.

If you really get stuck you can restore the virtual machine snapshot in VirtualBox to take you back to the beginning.

## Links

- The [Caching in HTTP](http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html) section of the [HTTP 1.1 specification](http://www.w3.org/Protocols/rfc2616/rfc2616.html)
- Mark Nottingham's [Caching Tutorial](http://www.mnot.net/cache_docs/)
- [NodeJS](http://nodejs.org/)
- [ExpressJS](http://expressjs.com/)
- [PhantomJS](http://phantomjs.org/)
- [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs)
- [browsermob-proxy](https://github.com/webmetrics/browsermob-proxy)
- [HAR Viewer](http://www.softwareishard.com/blog/har-viewer/)
