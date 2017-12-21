const commentsController = require('../controllers').comments;
const commentsRouter = require('express').Router();

commentsRouter.put('/:comment_id', commentsController.voteComment);
commentsRouter.delete('/:comment_id', commentsController.deleteComment);

commentsRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in comments routes');
});

module.exports = commentsRouter;