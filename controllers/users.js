const {Users} = require('../models/models');
module.exports ={
  getUsers (req,res,next) {
    console.log('*** Finding users in the database ...');
    Users.find()
    .then(users => {
      const obj ={
        users_found : users.length,
        list_of_users : users
      }
      res.json(obj);
    })
    .catch(next);
  },
  userById (req,res,next) {
    const _id = req.params.user_id;
    console.log(`*** Received a find by ID request, ID : ${_id} `);
    Users.findById(_id)
    .then(user => {
      res.json(user);
    })
    .catch(next);
  },
  addUser(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  removeUser(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  updateUser(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  }
};