const {topics} = require('../controllers');
const topicsRouter = require('express').Router();

topicsRouter.get('/', topics.getTopics);
topicsRouter.get('/:topic_id', topics.getTopic);
topicsRouter.get('/add', topics.addTopic);
topicsRouter.post('/add', topics.addTopic);
topicsRouter.put('/:topic_id', topics.updateTopic);
topicsRouter.get('/:topic_id/articles', topics.getArticlesFromTopic);
topicsRouter.delete('/:topic_id', topics.removeTopic);

topicsRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in topics routes');
});

module.exports = topicsRouter;