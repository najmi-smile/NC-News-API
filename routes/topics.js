const topicsController = require('../controllers').topics;
const topicsRouter = require('express').Router();

topicsRouter.get('/', topicsController.getTopics);
topicsRouter.get('/:topic_id/articles', topicsController.getArticlesFromTopic);

topicsRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in topics routes');
});

module.exports = topicsRouter;