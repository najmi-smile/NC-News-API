const {users} = require('../controllers');
const usersRouter = require('express').Router();

usersRouter.get('/', users.getUsers);
usersRouter.get('/:user_id', users.userById);
usersRouter.get('/add', users.addUser);
usersRouter.post('/add', users.addUser);
usersRouter.put('/:user_id/', users.updateUser);
usersRouter.delete('/:user_id', users.removeUser);


usersRouter.use('/*', (req, res) => {
  res.status(404).send('Page not found in users routes');
});

module.exports = usersRouter;