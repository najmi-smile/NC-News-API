if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = Promise;
const apiRouter = require('./routes/apiRouter');
const url = require('url');
const session    = require('express-session');

mongoose.connect(process.env.mLab, {useMongoClient: true})
  .then(() => console.log('successfully connected to remote database'))
  .catch(err => console.log('connection failed', err));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({secret:'tahir'}));
// validator
app.use(expressValidator({
  errorFormatter: (param,msg,value) =>{
    let namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;
        while(namespace.length){
          formParam += '[' + namespace.shift() + ']';
        }
        return {
          param :formParam,
          msg : msg,
          value : value
        };
  }
}));

// delegate requests to router
app.get('/', (req,res) => {
  
  res.send('Please use /api/...... Need to show endpoints');
  // res.render('pages/contact')
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
