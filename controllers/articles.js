const {Articles, Comments} = require('../models/models');

module.exports ={
  getArticles (req,res,next) {
    Articles.find()
      .then(articles => {
        const obj ={
          articles_found : articles.length,
          list_of_articles : articles
        };
        res.json(obj);
      })
      .catch(next);      
  },
  getArticleById(req,res,next) {
    const _id = req.params.article_id;
    Articles.findById(_id)
      .then(article => {
        res.json(article);
      })
      .catch(next); 
  },
  addArticle(req,res,next) {
    const belongs_to = req.params.article_id || req.body.belongs_to;
    const article = {
      title : req.body.title,
      body : req.body.body,
      belongs_to : belongs_to,
      votes : req.body.votes,
      created_by : req.body.created_by
    };
    Articles.create(article, (err,article) => {
      if(err) next(err);
      res.json(article);
      
    });
  },
  removeArticle(req,res,next) {
    Articles.deleteOne({_id:req.params.article_id}, (err, response) => {
      if(err) next(err);
      res.json(response);
    });
  },
  voteArticle(req,res,next) {
    const _id = req.params.article_id;
    if(req.query.vote){
      const query = req.query.vote.toLowerCase();
      if( query === 'up' || query === 'down') {
        let value = 0;
        if (query === 'up') value = 1;
        if (query === 'down') value = -1;
        Articles.findOneAndUpdate({_id:_id},{ $inc: {votes : value} },{},(err, article) => {
          if (err) next(err);
          res.json(article);
        }); 
      } else {
        res.set(500).json({'error':'Please enter a valid vote'});
      }
    } else if(!req.query) {
      const article = req.body;
      const update = {
        title : article.title,
        body : article.body
      };
      Articles.findOneAndUpdate({_id:_id},update,{},(err, article) => {
        if (err) next(err);
        res.json(article);
      });
    } else {
      res.set(500).json({'error':'Please enter a valid url/query'});
    }
  
    
  }
};