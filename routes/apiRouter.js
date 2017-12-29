const apiRouter = require('express').Router();
const {articles,comments,topics,users} = require('../controllers');

// const  = express.;
const {articlesRouter,
  topicsRouter,usersRouter} = require('./index');

apiRouter.get('/', (req,res,next) => {
  console.log('*** Setting up the for required data ...');
  users.getUsersForIndexPage(req,res,next)
  .then(users => {
    console.log('*** Users found in database ',users.length);
    req.session.users = users;
    return topics.getTopics(req,res,next)
  })
  .then(topics => {
    console.log('*** Topics found in database ',topics.length);
    const Users = req.session.users;
    const Topics = topics;
    res.render('pages',{Users,Topics});
  })
  .catch(next);
});
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);

apiRouter.use('/*', (req, res) => {
  console.log(`Received a request from ${req.url} , Method: ${req.method} ...`)
  res.status(404).send('Page not found in api routes');
});

apiRouter.use((err, req, res, next) => {
  if (err.code === 'ENOENT') {
    console.log(`Received a request from ${req.url} , Method: ${req.method} ...`)
    res.status(404).send(`Resource ${req.url} not found`);
  }
  console.log('***', err);
  console.log(`Received a request from ${req.url} , Method: ${req.method} ...`)
  res.status(404).send(`Resource message(code: ${err.code}): ${err.message}`);

});

module.exports = apiRouter;