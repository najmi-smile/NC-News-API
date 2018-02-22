const {Comments,Articles} = require('../models/models');
module.exports ={
  getComments (req,res,next) {
    Comments.find({belongs_to : req.params.article_id})
      .then(comments => {
        const obj ={
          comments_found : comments.length,
          list_of_comments : comments
        };
        res.json(obj);
      })
      .catch(next);
  },
  getCommentById (req,res,next) {
    const _id = req.params.comment_id;
    Comments.findById(_id)
      .then(comment => {
        res.json(comment);
      })
      .catch(next);  
  },
  addComment (req,res,next) {
    const belongs_to = req.params.article_id || req.body.belongs_to;
    const omment = {
      body : req.body.body,
      belongs_to : belongs_to,
      votes : req.body.votes,
      created_by : req.body.created_by
    };
    Comments.create(omment, (err,omment) => {
      if(err) next(err);
      res.json(omment);
    });
  },
  voteComment (req,res,next) {
    const _id = req.params.comment_id;
    if(req.query.vote){
      const query = req.query.vote.toLowerCase();
      if( query === 'up' || query === 'down') {
        let value = 0;
        if (query === 'up') value = 1;
        if (query === 'down') value = -1;

        Comments.findOneAndUpdate({_id:_id},{ $inc : {votes : value} },{},(err, comment) => {
          if (err) next(err);
          res.json(comment);
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
  },
  removeComment(req,res,next) {
    Comments.deleteOne({_id:req.params.comment_id}, (err, response) => {
      if(err) next(err);
      res.json(response);
    });
  }
};