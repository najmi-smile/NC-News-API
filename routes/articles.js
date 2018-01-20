const {articles,comments} = require('../controllers');
const articlesRouter = require('express').Router(['strict']);
// TODO move articles with topic to establish the connection

articlesRouter.get('/', articles.getArticles);
articlesRouter.get('/add', articles.addArticle);
articlesRouter.post('/add', articles.addArticle);
articlesRouter.get('/:article_id', articles.getArticleById);
articlesRouter.put('/:article_id', articles.updateArticle);
// articlesRouter.put('/:article_id?', articles.voteArticle);
articlesRouter.delete('/:article_id', articles.removeArticle);

//  commentsRouter
articlesRouter.get('/:article_id/comments', comments.getComments);
articlesRouter.get('/:article_id/addcomment', comments.addComment);
articlesRouter.post('/:article_id/addcomment', comments.addComment);
articlesRouter.get('/:article_id/:comment_id', comments.getCommentById);
articlesRouter.put('/:article_id/:comment_id', comments.updateComment);
articlesRouter.put('/:article_id/:comment_id', comments.voteComment);
articlesRouter.delete('/:article_id/:comment_id', comments.removeComment);

articlesRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in articles routes');
});

module.exports = articlesRouter;