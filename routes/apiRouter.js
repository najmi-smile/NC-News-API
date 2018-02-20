const apiRouter = require('express').Router();
const {articles,comments,topics,users} = require('../controllers');
const {articlesRouter,topicsRouter,usersRouter} = require('./index');

apiRouter.get('/', (req,res,next) => {
  const obj = {
    status : 'Ok'
  };
  res.json(obj);
});

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);

apiRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in api routes');
});

apiRouter.use((err, req, res, next) => {
  if (err.code === 'ENOENT') {
    res.status(404).send(`Resource ${req.url} not found`);
  }
  res.status(500).send(`Resource message(code: ${err.code}): ${err.message}`);
});

module.exports = apiRouter;