const {Users} = require('../models/models');

module.exports ={
  getUsers (req,res,next) {
    Users.find()
      .then(users => {
        res.json({users});
      })
      .catch(next);
  },
  userByName (req,res,next) {
    Users.find({username : req.params.user_name})
      .then(user => {
        user = user.pop();
        if(user) res.json(user);
        else res.set(500).json({error:'Resource not found'});
      })
      .catch(next);
  }
};