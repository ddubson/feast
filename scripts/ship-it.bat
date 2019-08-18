PUSHD e2e
call yarn test:run
POPD

PUSHD web
call yarn test
POPD

PUSHD api
call yarn test
POPD

echo "All Tests Pass!"
