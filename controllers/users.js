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
    console.log(`*** Wait! Adding User ... `);
    const user = req.body;
    Users.create(user, (err,user) => {
      if(err) next(err);
      res.json(user);
    });
  },
  removeUser(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  updateUser(req,res,next) {
    const _id = req.params.user_id;
    const User = req.body;
    const update = {
      username : User.name,
      name : User.name,
      avatar_url : User.avatar_url
    }
    console.log(`*** Received a request from ${User.name} ID ${_id} ...`)
    Users.findOneAndUpdate(_id,update,{},(err, user) => {
      if (err) next(err);
      res.json(user);
    });
  }
};