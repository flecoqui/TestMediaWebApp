#!/bin/bash
pushd ../src/MediaWebApp
http-server -c-1 ./build
popd
