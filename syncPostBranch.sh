#!/usr/bin/env sh

git checkout main
git pull
git checkout next
git pull origin main
git push
if [ -n "$1" ]
  then
    git push origin --delete $1
    git branch -D $1
fi