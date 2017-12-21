const commentsController = require('../controllers').comments;
const express = require('express');
const commentsRouter = express.Router();

commentsRouter.get('/', commentsController.getComments);
commentsRouter.post('/', commentsController.addComment);
commentsRouter.put('/:comment_id', commentsController.voteComment);
commentsRouter.delete('/:comment_id', commentsController.deleteComment);

commentsRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found');
});

module.exports = commentsRouter;