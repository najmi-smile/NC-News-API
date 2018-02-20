const {Users,Register} = require('../models/models');

module.exports ={
  getUsers (req,res,next) {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(next);
  },
  getUsersForIndexPage (req,res,next) {
    return Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(next);
  },
  userByName (req,res,next) {
    Users.find({username : req.params.user_name})
      .then(user => {
        user = user.pop();
        res.json(user);
      })
      .catch(next);
  },
  addUser(req,res,next) {
    const user = req.body;
    Register.create(user, (err,user) => {
      if(err) next(err);
      res.json(user);
    });
  },
  removeUser(req,res,next) {
    Users.deleteOne({_id:req.params.user_id}, (err, response) => {
      if(err) next(err);
      res.json(response);
    });
  },
  updateUser(req,res,next) {
    const _id = req.params.user_id;
    const User = req.body;
    const update = {
      username : User.name,
      name : User.name,
      avatar_url : User.avatar_url
    };
    Users.findOneAndUpdate(_id,update,{},(err, user) => {
      if (err) next(err);
      res.json(user);
    });
  }
};