const articlesController = require('../controllers').articles;
const commentsController = require('../controllers').comments;
const articlesRouter = require('express').Router();

articlesRouter.get('/', articlesController.getarticles);
articlesRouter.get('/:article_id', articlesController.getArticleById);
articlesRouter.get('/:article_id/comments', commentsController.getComments);
articlesRouter.post('/:article_id/comments', commentsController.addComment);

articlesRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in articles routes');
});

module.exports = articlesRouter;