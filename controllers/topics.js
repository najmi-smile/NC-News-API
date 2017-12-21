const {Topics} = require('../models/models');
module.exports ={
  getTopics (req,res,nex) {
    res.json(`${req.url} is comming soon .....`);
  },
  getArticlesFromTopic(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  }
};