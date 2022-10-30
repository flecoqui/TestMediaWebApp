#!/bin/bash
pushd ../src/MediaWebApp
npm install
npm audit fix
tsc --build tsconfig.json
webpack --config webpack.config.js
popd
