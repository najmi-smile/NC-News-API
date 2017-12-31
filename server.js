if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
// const config = require('./config');

// const db = config.DB[process.env.NODE_ENV] || process.env.DB;
mongoose.Promise = Promise;
const apiRouter = require('./routes/apiRouter');
const url = require('url');
const session    = require('express-session');

mongoose.connect(process.env.mLab, {useMongoClient: true})
  .then(() => console.log('successfully connected to remote database'))
  .catch(err => console.log('connection failed', err));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({secret:'tahir'}));

// delegate requests to router
app.get('/', (req,res) => {
  // res.send('All is well')
  res.render('pages/contact')
});
app.use('/api', (req,res) => {
  console.log(`Received a request from ${req.url} method ${req.method}..`);
  // console.log('api URL' ,req.params);
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
