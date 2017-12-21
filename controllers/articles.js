const {Articles} = require('../models/models');
module.exports ={
  getarticles (req,res,nex) {
    res.json(`${req.url} is comming soon .....`);
  },
  getArticleById(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  }
};