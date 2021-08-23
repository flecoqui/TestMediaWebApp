#!/bin/bash
pushd ../src/MediaWebApp
docker run -d -p 80:80 mediawebapp-image:v1
popd
