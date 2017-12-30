const {Users} = require('../models/models');
const moment = require('moment');

module.exports ={
  getUsers (req,res,next) {
    console.log('*** Finding users in the database ...');
    Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(next);
  },
  getUsersForIndexPage (req,res,next) {
    console.log('*** Finding users in the database ...');
    return Users.find()
    .then(users => {
      return users;
    })
    .catch(next);
  },
  userByName (req,res,next) {
    const username = req.params.user_name;
    console.log(`*** Received a find by username request, UserName : ${username} `);
    Users.find({username : req.params.user_name})
    .then(user => {
      user = user.pop();
      res.render('pages/userDisplay',{user,moment});
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
    console.log(`*** Warning! Deleting User ... `);
    Users.deleteOne({_id:req.params.user_id}, (err, response) => {
      if(err) next(err);
      res.json(response);
    })
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