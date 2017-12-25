const {Comments} = require('../models/models');
module.exports ={
  getComments (req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  getCommentById (req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  addComment (req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  voteComment (req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  removeComment(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  updateComment(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  }
};