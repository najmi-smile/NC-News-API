const {topics} = require('../controllers');
const topicsRouter = require('express').Router();

topicsRouter.get('/', topics.getTopics);
topicsRouter.post('/add', topics.addTopic);
topicsRouter.get('/:topic_id', topics.getTopic);
topicsRouter.get('/:slug/articles', topics.getArticlesFromTopic);

topicsRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in topics routes');
});

module.exports = topicsRouter;