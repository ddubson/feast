call yarn test:run
call yarn test build
call ./gradlew clean test build

echo "All Tests Pass!"
