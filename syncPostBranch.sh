#!/usr/bin/env sh

git checkout main
git pull

git checkout next
git pull origin main
git push

if [ -n $1 ]
then
    if [ $1 != "main" ] && [ $1 != "next" ]
    then
        git push origin --delete $1
        git branch -D $1
    else
        echo "branch to delete can't be main or next"
    fi
else
    echo "You can specify branch to delete as first argument"
fi

if [ -n "$2" ]
then
    if [ $2 != "main" ] && [ $2 != "next" ]
    then
        git checkout -b $2 next
    else
        echo "branch to delete can't be main or next"
    fi
else
    echo "You can specify branch to create based on next branch as second argument"
fi