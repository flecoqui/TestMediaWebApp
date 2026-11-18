#!/bin/bash
set -u
##############################################################################
# colors for formatting the output
##############################################################################
# shellcheck disable=SC2034
{
YELLOW='\033[1;33m'
GREEN='\033[1;32m'
RED='\033[0;31m'
BLUE='\033[1;34m'
NC='\033[0m' # No Color
}
##############################################################################
#- print functions
##############################################################################
printMessage(){
    printf '%b%s%b\n' "$GREEN" "$1" "$NC"
}
printWarning(){
    printf '%b%s%b\n' "$YELLOW" "$1" "$NC"
}
printError(){
    printf '%b%s%b\n' "$RED" "$1" "$NC" >&2
}
printProgress(){
    printf '%b%s%b\n' "$BLUE" "$1" "$NC"
}
pushd ../src/MediaWebApp
printMessage "npm install"
npm install
printMessage "npm audit fix"
npm audit fix
printMessage "tsc --build  tsconfig.json"
tsc --build tsconfig.json
printMessage "webpack --config webpack.config.js"
webpack --config webpack.config.js
popd
