#!/usr/bin/env bash
SCRIPT_PATH=`dirname $0`
echo Starting HAR Viewer. Use Ctrl+C to stop.
GEM_PATH=$SCRIPT_PATH/build/gems:$GEM_PATH $SCRIPT_PATH/build/gems/bin/har $@ >> $SCRIPT_PATH/tmp/har-viewer.log 2>&1

