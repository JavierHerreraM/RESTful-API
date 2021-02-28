# Restful API

It is a REST API to make C.R.U.D operations with a list of users.

If you want to try it out, go to [Endpoint](https://endpoint-javier-herrera.netlify.app/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Latest version of Node.js and a MongoDB account.

### Installing

Clone the project and run npm install

```
npm install
```

Create inside the congif folder a .env file

```
your-folder/back/config
$ touch .env
```

Inside the .env file create the following variables:

```
PORT = The local host in which you want to open the app
MONGO_URI = Mongodb connection string
LOCAL_MONGO_URI = A local mongodb connection string
```

## Usage

### Get all users
Request: GET

Route: https://jh-endpoint-api.herokuapp.com/users

Does a GET request that searches for all users and returns a 200 status code and an array of users. Each user object has five properties: username, firstName, lastName, age, and email.

Response example:

```
[
    {
        "username": "Username1",
        "firstName": "First name1",
        "lastName": "Last name1",
        "age": 29,
        "email": "email1@mail.com"
    },
    {
        "username": "Username2",
        "firstName": "First name2",
        "lastName": "Last name2",
        "age": 52,
        "email": "email2@mail.com"
    }
]
```

If it doesn't found any username, it returns a 404 status code and an error message.

Response example:

```
The username Username was not found.
```

### Get a specific user
Request: GET

Route: https://jh-endpoint-api.herokuapp.com/users/Username1

Does a GET request that searches for a user with the given username and returns a 200 status code and the found user object. The returned user object has five properties: username, firstName, lastName, age, and email.

Response example:

```
{
    "username": "Username1",
    "firstName": "First name1",
    "lastName": "Last name1",
    "age": 29,
    "email": "email1@mail.com"
}
```

If it doesn't found any username, it returns a 404 status code and an error message.

Response example:

```
The username Username was not found.
```

### Create a new user
Request: POST

Route: https://jh-endpoint-api.herokuapp.com/users

Does a POST request that creates a new user, it returns a 200 status code and the created user object.

The body of the request has five fields: username, firstName, lastName, age, and email.

The username must be alphanumeric and unique, the field is case sensitive; it requires the username, firstName, and lastName fields; age must be greater than 0 and the email must have an email format.

Request body example:

```
{
    "username": "username1",
    "firstName": "example1",
    "lastName": "example1",
    "age": 25,
    "email": "something@gmail.com"
}
```

Response example:

```
{
    "username": "username1",
    "firstName": "example1",
    "lastName": "example1",
    "age": 25,
    "email": "something@gmail.com"
}
```

If the body of the request is invalid or if the username already exists it returns a 400 status code and an error message.

Response examples:

```
The username already exists.
```

In case of a bad request body

```
"First name" is required
```

### Update a user
Request: PUT

Route: https://jh-endpoint-api.herokuapp.com/users/Username1

Does a PUT request that searches for a user with the given username and updates it, returning a 200 status code and the updated user object.

The body of the request has four fields: firstName, lastName, age, and email.

It requires the firstName, and lastName fields; age must be greater than 0 and the email must have an email format.

Request body example:

```
{
    "firstName": "name changed",
    "lastName": "last name changed",
    "age": 40,
    "mail": "something@gmail.com"
}
```

Response example:

```
{
    "username": "Username1",
    "firstName": "name changed",
    "lastName": "last name changed",
    "age": 40,
    "mail": "something@gmail.com"
}
```

If the body of the request is invalid it returns a 400 status code and an error message. If the username is not found it returns a 404 status code and an error message.

Response example:

```
"First name" is required
```

In case of a user not found

```
The username Username was not found.
```

### Delete a user
Request: DELETE

Route: https://jh-endpoint-api.herokuapp.com/users/Username1

Does a DELETE request that searches for a user with the given username and deletes it, returning a 200 status code and the deleted user object. 

The returned user object has five properties: username, firstName, lastName, age, and email.

Response example:

```
{
    "username": "Username1",
    "firstName": "name changed",
    "lastName": "last name changed",
    "age": 40,
    "mail": "something@gmail.com"
}
```

If it doesn't found any username, it returns a 404 status code and an error message.

Response example:

```
The username Username was not found.
```

## Running the tests

Just run npm test in the terminal.

```
$ npm run test
```

## Deployment

Create the build folder with the build command and deploy it to the platform of your choice.

## Built With

* [Node.js](https://nodejs.org/en/) - The runtime enviroment
* [Express](https://expressjs.com/) - Node framework
* [Mongoose](https://mongoosejs.com/) - Library for MongoDB
* [npm](https://www.npmjs.com/) - Dependency Management

## Authors

* **Javier Herrera** - *Project creator* - [My GitHub](https://github.com/JavierHerreraM)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
