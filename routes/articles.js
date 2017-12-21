const articlesController = require('../controllers').articles;
const express = require('express');
const app = express();
const articlesRouter = express.Router();
const commentsRouter = require('./comments');

articlesRouter.use('/:article_id/comments', (req,res) => {
  console.log(`Received a request from ${req.url} method ${req.method}..`);
  commentsRouter(req,res);
});

articlesRouter.get('/', articlesController.getarticles);
articlesRouter.get('/:article_id', articlesController.getArticleById);

articlesRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found');
});

module.exports = articlesRouter;