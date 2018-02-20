## Northcoders News API

## About
A RESTful API for Northcoders News, a news aggregation site. Built using Node.js (v8.6.0), Express.js (v4.14.0), Mongoose (v3.4.9) and Mongoose(v.4.7.0).

This API has been deployed to Heroku [here](https://quiet-shore-88770.herokuapp.com/).

## Local Set Up
Check if Node.js is installed on your machine open a terminal window and enter:

```$ node -v```

If you do not already have Node.js installed please follow the instructions on [this guide](https://nodejs.org/en/download/package-manager/).

Check if npm is installed on your machine enter this command in you terminal window: 

```$ npm -v```

If you do not have npm already installed please follow [this guide](https://www.npmjs.com/get-npm) to set it up.

Check if git is installed on your machine please enter the following commitng in your terminal window: 

```$ git --version```

If you do not already have git installed on your machine please follow [this guide](https://git-scm.com/).

To check if MongoDB is installed 
```$  mongod --version```

If you do not have MongoDB already installed, please follow [this guide](https://docs.mongodb.com/manual/installation/)


# Installation

To run this project you will need to clone it onto your local machine and install all dependencies.

To do so use the command line to navigate to your preferred directory on your local machine and enter the following command on the terminal window:

```$ git clone https://github.com/najmi-smile/BE-FT-northcoders-news.git```

Navigate inside the folder and install all dependencies by entering the following command on your terminal window: 

```$ npm install```

 Enter the following command in your terminal window to run Mongo server:

```$ mongod```



Open another terminal window, navigate inside the project folder and enter the following command to populate the database: 

```$ node seed/seed.js```
or
``` $ npm run seed ```

Finally to run the application enter the following command in your terminal window: 

```$ npm start```

This will run a local server on port 3000. All endpoints can be found locally on http://localhost:3000 .

# Testing

To test the API navigate to the project directory and enter the following command

```$ npm test```

Testing was carried out using Mocha, Chai and Supertest

## API Routes

```
GET /api/topics
```
Get all the topics

```
GET /api/topics/:slug/articles
```
Return all the articles for a certain topic

```
GET /api/articles
```
Returns all the articles
```
GET /api/articles/:article_id
```
Returns a JSON object with the article information for the specified article

```
GET /api/articles/:article_id/comments
```
Get all the comments for an individual article

```
POST /api/articles/:article_id/comments
```
Add a new comment to an article. This route requires a JSON body with a comment key and value pair
e.g: {"comment": "This is my new comment"}

```
PUT /api/articles/:article_id
```
Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: /api/articles/:article_id?vote=up

```
PUT /api/comments/:comment_id
```
Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: /api/comments/:comment_id?vote=down

```
DELETE /api/comments/:comment_id
```
Deletes a comment

```
GET /api/users
```
Returns all users

```
GET /api/users/:username
```
Returns a JSON object with the profile data for the specified user.
