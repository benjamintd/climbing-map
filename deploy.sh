#!/usr/bin/env bash

git stash
git checkout -B gh-pages
git add -f build
git commit -am 'Rebuild Website'
git filter-branch -f --prune-empty --subdirectory-filter build
git push -f origin gh-pages
git checkout -
git stash pop || exit 0
