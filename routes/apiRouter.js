const express = require('express');
const apiRouter = express.Router();
const {articlesRouter,commentsRouter,
      topicsRouter,usersRouter} = require('./index');

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);

apiRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found');
});

apiRouter.use((err, req, res, next) => {
  if (err.code === 'ENOENT') {
    res.status(404).send(`Resource ${req.url} not found`);
  }
  console.log('***', err);
  res.status(404).send(`Resource message(code: ${err.code}): ${err.message}`);

});

module.exports = apiRouter;