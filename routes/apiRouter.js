const apiRouter = require('express').Router();
const {articles,comments,topics,users} = require('../controllers');
const moment = require('moment');

// const  = express.;
const {articlesRouter,
  topicsRouter,usersRouter} = require('./index');

apiRouter.get('/', (req,res,next) => {
  console.log('*** SetUp initialized ...');
  const obj = {};
  users.getUsersForIndexPage(req,res,next)
  .then(users => {
    console.log('*** Users found in database ',users.length);
    // req.session.users = users;
    obj['users'] = users;
    return topics.getTopics(req,res,next);
  })
  .then(topics => {
    // req.session.topics = topics;
    obj['topics'] = topics;
    console.log('*** Topics found in database ',obj['topics'].length);
    
    return articles.getArticlesForIndexPage(req,res,next);
  })
  .then(data => {
    console.log(`*** ${data['comments'].length} Comments found for ${data['article']._id} in database `);
    obj['article'] = data['article'];
    obj['comments'] = data['comments'];
    obj['moment'] = moment;
    res.render('pages',{obj});
  })
  .catch(next);
});

apiRouter.get('/contact', (req,res,next)=>{
  // res.send('ALl Good');
  res.render('pages/contactUs');
});
apiRouter.post('/contact', (req,res,next) => {
  console.log('post body',req.body);
  res.json('All is well');
});
apiRouter.post('/signup', (req,res,next) => {
  console.log('post body',req.body);
  res.json('All is well');
});
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);

apiRouter.use('/*', (req, res) => {
  console.log(`Received a request from ${req.url} , Method: ${req.method} ...`);
  res.status(404).send('Page not found in api routes');
});

apiRouter.use((err, req, res, next) => {
  if (err.code === 'ENOENT') {
    console.log(`Received a request from ${req.url} , Method: ${req.method} ...`);
    res.status(404).send(`Resource ${req.url} not found`);
  }
  console.log('***', err);
  console.log(`Received a request from ${req.url} , Method: ${req.method} ...`);
  res.status(404).send(`Resource message(code: ${err.code}): ${err.message}`);

});

module.exports = apiRouter;