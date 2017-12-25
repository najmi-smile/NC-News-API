const {articles} = require('../controllers');
const articlesRouter = require('express').Router();
const commentsRouter = require('./comments');

articlesRouter.get('/', articles.getArticles);
articlesRouter.get('/add', articles.addArticle);
articlesRouter.post('/add', articles.addArticle);
articlesRouter.get('/:article_id', articles.getArticleById);
articlesRouter.put('/:article_id', articles.updateArticle);
articlesRouter.delete('/:article_id', articles.removeArticle);

// console.log(commentsRouter)
articlesRouter.use('/:article_id/comments', commentsRouter);

articlesRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in articles routes');
});

module.exports = articlesRouter;