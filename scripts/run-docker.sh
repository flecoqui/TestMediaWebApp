#!/bin/bash
pushd ../src/MediaWebApp
docker run -d -p 8081:80 mediawebapp-image:v1
popd
