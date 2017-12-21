const {Users} = require('../models/models');
module.exports ={
  getUsers (req,res,nex) {
    res.json(`${req.url} is comming soon .....`);
  },
  userById (req,res,nex) {
    res.json(`${req.url} is comming soon .....`);
  }
};