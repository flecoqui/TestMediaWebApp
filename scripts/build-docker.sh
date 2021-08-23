#!/bin/bash
pushd ../src/MediaWebApp
docker build -t mediawebapp-image:v1 .
popd
