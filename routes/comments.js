const {comments} = require('../controllers');
const commentsRouter = require('express').Router();

commentsRouter.get('/', comments.getComments);
commentsRouter.get('/add', comments.addComment);
commentsRouter.post('/add', comments.addComment);
commentsRouter.get('/:comment_id', comments.getCommentById);
commentsRouter.put('/:comment_id', comments.updateComment);
commentsRouter.put('/:comment_id?', comments.voteComment);
commentsRouter.delete('/:comment_id', comments.removeComment);

commentsRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in comments routes');
});

module.exports = commentsRouter;