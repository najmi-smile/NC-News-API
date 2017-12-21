const usersController = require('../controllers').users;
const usersRouter = require('express').Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:user_id', usersController.userById);

usersRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in users routes');
});

module.exports = usersRouter;