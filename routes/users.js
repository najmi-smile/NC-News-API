const usersController = require('../controllers').users;
const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:user_id', usersController.userById);

usersRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found');
});

module.exports = usersRouter;