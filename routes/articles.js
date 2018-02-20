const {articles,comments} = require('../controllers');
const articlesRouter = require('express').Router(['strict']);

articlesRouter.get('/', articles.getArticles);
articlesRouter.post('/add', articles.addArticle);
articlesRouter.put('/:article_id', articles.voteArticle);
articlesRouter.get('/:article_id', articles.getArticleById);
articlesRouter.delete('/:article_id', articles.removeArticle);

//  commentsRouter
articlesRouter.get('/:article_id/comments', comments.getComments);
articlesRouter.post('/:article_id/addcomment', comments.addComment);
articlesRouter.put('/:article_id/:comment_id', comments.voteComment);
articlesRouter.get('/:article_id/:comment_id', comments.getCommentById);
articlesRouter.delete('/:article_id/:comment_id', comments.removeComment);

articlesRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in articles routes');
});

module.exports = articlesRouter;