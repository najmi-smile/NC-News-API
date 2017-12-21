const topicsController = require('../controllers').topics;
const express = require('express');
const app = express();
const topicsRouter = express.Router();

topicsRouter.get('/', topicsController.getTopics);
topicsRouter.get('/:topic_id/article', topicsController.getArticlesFromTopic);

topicsRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found');
});

module.exports = topicsRouter;