# About

This service provides the ability to:
* create a new user
* update an existing user
* get an existing user
* delete an existing user

### Usage

```
make install
make dev
```

To run tests
```
make unit-test
make integration-test
```

Sample .env file
```
PORT=3000
MONGODB_URL=mongodb://mongodb:27017/user-service
CONTEXT_ROUTE=/user-service
```
    
You should be able to create a user at the end-point:  
`http://localhost:3000/user-service/v1/user`
