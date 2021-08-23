#!/bin/bash
pushd ../src/MediaWebApp
tsc --build tsconfig.json
webpack --config webpack.config.js
popd
