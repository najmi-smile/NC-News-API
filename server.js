const env = process.env.NODE_ENV || 'dev';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = Promise;
const apiRouter = require('./routes/apiRouter');

app.use(cors());

let DB;
if(env === 'dev' || env === 'test'){
  DB = 'mongodb://localhost/northcoders-news-api';
}
else DB = process.env.mLab;

mongoose.connect(DB, {useMongoClient: true})
  .then(() => console.log('successfully connected to remote database'))
  .catch(err => console.log('connection failed', err));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// delegate requests to router
app.get('/', (req,res) => {
  res.render('index.ejs');
});
app.use('/api', (req,res) => {
  apiRouter(req,res);
});
app.use('/*', (req, res,next) => {
  res.status(404).send('Page not found');
});

// error handling 
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

// process.on('SIGINT', function() {  
//   mongoose.connection.close(function () { 
//     console.log('Mongoose default connection disconnected through app termination'); 
//     process.exit(0); 
//   }); 
// }); 

module.exports = app;
