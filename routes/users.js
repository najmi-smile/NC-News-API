const {users} = require('../controllers');
const usersRouter = require('express').Router();

usersRouter.get('/', users.getUsers);
usersRouter.get('/:user_name', users.userByName);

usersRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in users routes');
});

module.exports = usersRouter;