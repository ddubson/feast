call yarn install
call yarn lint || exit 1
call yarn build || exit 1
call yarn test || exit 1

echo "All Tests Pass!"
