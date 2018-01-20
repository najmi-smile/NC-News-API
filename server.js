if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = Promise;
const apiRouter = require('./routes/apiRouter');
const url = require('url');


mongoose.connect(process.env.mLab, {useMongoClient: true})
  .then(() => console.log('successfully connected to remote database'))
  .catch(err => console.log('connection failed', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




// delegate requests to router
app.get('/', (req,res) => {
  res.send('Please use /api/...... Need to show endpoints');
});
app.use('/api', (req,res) => {
  console.log(`Received a request from ${req.url} method ${req.method}..`);
  apiRouter(req,res);
});
app.use('/*', (req, res,next) => {
  res.status(404).send('Page not found');
});

// error handling 
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;
