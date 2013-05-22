#!/usr/bin/env bash
SCRIPT_PATH=`dirname $0`
echo Starting BrowserMob Proxy on port 9090. Use Ctrl+C to stop.
$SCRIPT_PATH/build/browsermob-proxy/bin/browsermob-proxy --port 9090

