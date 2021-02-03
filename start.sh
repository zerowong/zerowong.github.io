#!/usr/bin/env sh

set -e

git fetch

git merge

yarn build
