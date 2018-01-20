const {Articles,Topics, Comments} = require('../models/models');

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
  getArticlesForIndexPage (req,res,next) {
    let article;
    console.log('*** Fetching latest article ...');
      return Articles.find().limit(1).sort({$natural:-1})
      .then(data => {
        article =  data.pop();
        return article;
      })
      .then(article => {
        return Comments.find({belongs_to : article._id})
        .then(comments => {
          return {article,comments};
        })
      })
      .catch(next);
  },
  getArticleById(req,res,next) {
    const _id = req.params.article_id;
    console.log(`*** Looking for article, ID : ${_id} `);
    Articles.findById(_id)
    .then(article => {
      res.json(article);
    })
    .catch(next); 
  },
  addArticle(req,res,next) {
    console.log(`*** Wait! Adding article, Title : ${req.body.title} ... `);
    const belongs_to = req.params.article_id || req.body.belongs_to;
    const article = {
      title : req.body.title,
      body : req.body.body,
      belongs_to : belongs_to,
      votes : req.body.votes,
      created_by : req.body.created_by
    }
    Articles.create(article, (err,article) => {
      if(err) next(err);
      res.json(article);
      
    })
  },
  removeArticle(req,res,next) {
    console.log(`*** Warning! Deleting article ... `);
    Articles.deleteOne({_id:req.params.article_id}, (err, response) => {
      if(err) next(err);
      res.json(response);
    });
  },
  updateArticle(req,res,next) {
    const _id = req.params.article_id;
    
    console.log(`*** Received request from url: ${req.url} METHOD : ${req.method} ..`)

    if(req.query){
      const query = req.query.vote.toLowerCase();
      if( query === 'up' || query === 'down') {
        let value = 0;
        if (query === 'up') value = 1;
        if (query === 'down') value = -1;

        Articles.findById(_id)
        .then(article => {
          console.log(`votes return for ID ${_id} : ${article.votes}`)
          return article.votes;
        })
        .then(votes => {
          Articles.findOneAndUpdate(_id,{votes : votes+value},{},(err, article) => {
            if (err) next(err);
            res.json(article);
          });
        })
        .catch(next); 
      } else {
        res.json('Please enter a valid query string');
      }
    } else {
      const article = req.body;
      const update = {
        title : article.title,
        body : article.body
      }
      console.log(`*** Updating article ${article.title} ID ${_id} ...`)
      // console.log('Query',req);
      Articles.findOneAndUpdate(_id,update,{},(err, article) => {
        if (err) next(err);
        res.json(article);
      });
    }
    
  }
};