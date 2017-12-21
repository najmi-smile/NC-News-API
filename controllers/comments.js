const {Comments} = require('../models/models');
module.exports ={
  getComments (req,res,nex) {
    res.json(`${req.url} is comming soon .....`);
  },
  addComment (req,res,nex) {
    res.json(`${req.url} is comming soon .....`);
  },
  voteComment (req,res,nex) {
    res.json(`${req.url} is comming soon .....`);
  },
  deleteComment(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  }
};