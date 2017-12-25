const {Articles} = require('../models/models');
module.exports ={
  getArticles (req,res,next) {
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
  addArticle(req,res,next) {

  },
  removeArticle(req,res,next) {

  },
  updateArticle(req,res,next){
    
  }
};