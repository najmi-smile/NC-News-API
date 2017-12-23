const {Articles} = require('../models/models');
module.exports ={
  getarticles (req,res,next) {
    console.log('*** Finding articles in the database ...');
    Articles.find()
    .then(articles => {
      const obj ={
        articles_found : articles.length,
        list_of_articles : articles
      }
      res.json(obj);
    })
    .catch(next);
  },
  getArticleById(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  addArticles(req,res,next) {

  },
  removeArticles(req,res,next) {
    
  }
};