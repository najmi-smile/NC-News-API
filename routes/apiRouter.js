const apiRouter = require('express').Router();
// const  = express.;
const {articlesRouter,
  topicsRouter,usersRouter} = require('./index');

apiRouter.get('/', (req,res,next) => {
  res.render('pages')
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