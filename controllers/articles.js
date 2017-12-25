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
    const _id = req.params.article_id;
    console.log(`*** Received a find by ID request, ID : ${_id} `);
    Articles.findById(_id)
    .then(article => {
      res.json(article);
    })
    .catch(next); 
  },
  addArticle(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  removeArticle(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  updateArticle(req,res,next){
    const _id = req.params.article_id;
    const article = req.body;
    const update = {
      title : article.title,
      body : article.body
    }
    console.log(`*** Received a request from ${article.title} ID ${_id} ...`)
    Articles.findOneAndUpdate(_id,update,{},(err, article) => {
      if (err) next(err);
      res.json(article);
    });
  }
};