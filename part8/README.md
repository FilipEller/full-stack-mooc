# Library app
This is a full stack app that uses React and Apollo/GraphQL.

## Getting started

### Prerequisites

1. Install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
1. Set up a [Mongo Database](https://www.mongodb.com/)
1. Store the MongoDB's address in the file `.env` in the project root as `MONGODB_URI`
1. Store a secret key for JWT in `.env` as variable `SECRET`. It can be any string

### Starting the app

Run the backend:
1. `cd library-backend`
1. `npm install`
1. `node index.js`
1. Visit the Apollo Server on https://localhost:4000

Run the frontend:
1. `cd library-frontend`
1. `npm install`
1. `npm start`
1. Visit the React app on http://localhost:3000

To use all features, create a user by querying the server on https://localhost:4000.
Use the mutation:  
```
mutation CreateUser($username: String!, $favouriteGenre: String!) {
  createUser(username: $username, favouriteGenre: $favouriteGenre) {
    id
    username
    favouriteGenre
  }
}
```
and the variables:  
```
{
  "username": "user",
  "favouriteGenre": "classic"
}
```
Now you can login in the frontend. All users have the password `secret`.
