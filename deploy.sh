ng build --prod
mv -f ./dist/* ../track-cash.github.io/
cd ../track-cash.github.io
git add *
git commit -m "asdfdasf"
git push -u origin master
