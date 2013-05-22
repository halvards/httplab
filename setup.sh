#!/usr/bin/env bash

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "I require node but it's not installed or not on the path. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "I require npm but it's not installed or not on the path. Aborting." >&2; exit 1; }
command -v java >/dev/null 2>&1 || { echo "I require java but it's not installed or not on the path. Aborting." >&2; exit 1; }
command -v ruby >/dev/null 2>&1 || { echo "I require ruby but it's not installed or not on the path. Aborting." >&2; exit 1; }
command -v gem >/dev/null 2>&1 || { echo "I require gem but it's not installed or not on the path. Aborting." >&2; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "I require curl but it's not installed or not on the path. Aborting." >&2; exit 1; }
command -v unzip >/dev/null 2>&1 || { echo "I require unzip but it's not installed or not on the path. Aborting." >&2; exit 1; }
command -v grep >/dev/null 2>&1 || { echo "I require grep but it's not installed or not on the path. Aborting." >&2; exit 1; }
command -v awk >/dev/null 2>&1 || { echo "I require awk but it's not installed or not on the path. Aborting." >&2; exit 1; }

# Setup
BROWSERMOB_PROXY_VERSION='2.0-beta-8'

if [ ! -d client/build ];
then
  mkdir client/build
fi

if [ ! -d client/tmp ];
then
  mkdir client/tmp
fi

if [ ! -f client/build/browsermob-proxy-2.0-beta-8-bin.zip ];
then
  echo Downloading BrowserMob Proxy
  curl --output client/build/browsermob-proxy-2.0-beta-8-bin.zip https://s3-us-west-1.amazonaws.com/lightbody-bmp/browsermob-proxy-2.0-beta-8-bin.zip
fi

if [ ! -d client/build/browsermob-proxy-2.0-beta-8 ];
then
  unzip -q -d client/build client/build/browsermob-proxy-2.0-beta-8-bin.zip
fi

if [ ! -L client/build/browsermob-proxy ];
then
  ln -s browsermob-proxy-2.0-beta-8 client/build/browsermob-proxy
fi

if [ ! -f client/build/gems/bin/har ];
then
  echo Installing the HAR viewer
  gem install har --install-dir=client/build/gems 
fi

echo Installing client NodeJS dependencies
npm --prefix client install client

echo Installing service NodeJS dependencies
npm --prefix service install service



