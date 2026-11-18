#!/bin/bash
pushd ../src/MediaWebApp
http-server -c-1 ./build -a 0.0.0.0 -p 8080
popd
