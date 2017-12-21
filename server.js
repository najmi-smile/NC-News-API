if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
mongoose.Promise = Promise;
const apiRouter = require('./routes/apiRouter');

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// delegate requests to router
app.use('/api', (req,res) => {
  console.log(`Received a request from ${req.url} method ${req.method}..`);
  apiRouter(req,res);
});
app.use('/*', (req, res) => {
  res.status(404).send('Page not found');
});

// error handling 
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;
