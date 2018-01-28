const {Comments} = require('../models/models');
module.exports ={
  getComments (req,res,next) {
    console.log(`*** Finding comments for ${req.params.article_id} in the database ...`);
    // console.log('*** article_id', req.session.article_id);
    // console.log('URL :', req.url);

    Comments.find({belongs_to : req.params.article_id})
    .then(comments => {
      const obj ={
        comments_found : comments.length,
        list_of_comments : comments
      }
      res.json(obj);
    })
    .catch(next);
  },
  getCommentById (req,res,next) {
    console.log('params :', req.params);

    const _id = req.params.comment_id;
    console.log(`*** Received a find by ID request, ID : ${_id} `);
    Comments.findById(_id)
    .then(comment => {
      res.json(comment);
    })
    .catch(next);  
  },
  addComment (req,res,next) {
    console.log(`*** Wait! Adding comment ... `);
    const belongs_to = req.params.article_id || req.body.belongs_to;
    const omment = {
      body : req.body.body,
      belongs_to : belongs_to,
      votes : req.body.votes,
      created_by : req.body.created_by
    }
    Comments.create(omment, (err,omment) => {
      if(err) next(err);
      res.json(omment);
    });
  },
  voteComment (req,res,next) {
    const _id = req.params.comment_id;
    
    console.log(`*** Received request from url: ${req.url} METHOD : ${req.method} ..`)

    if(req.query){
      const query = req.query.vote.toLowerCase();
      if( query === 'up' || query === 'down') {
        let value = 0;
        if (query === 'up') value = 1;
        if (query === 'down') value = -1;

        Comments.findById(_id)
        .then(comment => {
          console.log(`votes return for ID ${_id} : ${comment.votes}`)
          return comment.votes;
        })
        .then(votes => {
          console.log('Votes comming backe', votes);
          votes += value;
          console.log('id for update votes', _id);
          Comments.findOneAndUpdate({_id:_id},{votes : votes},{},(err, comment) => {
            if (err) next(err);
            res.json(comment);
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
      Articles.findOneAndUpdate({_id:_id},update,{},(err, article) => {
        if (err) next(err);
        res.json(article);
      });
    }
    // res.json(`${req.url} is comming soon .....`);
  },
  removeComment(req,res,next) {
    console.log(`*** Warning! Deleting comment ... `);
    Comments.deleteOne({_id:req.params.comment_id}, (err, response) => {
      if(err) next(err);
      res.json(response);
    })
  },
  updateComment(req,res,next) {
    const _id = req.params.comment_id;
    
    const comment = req.body;
    const update = {
      body : comment.body
    }
    console.log(`*** Received a request from ID ${_id} ...`)
    Comments.findOneAndUpdate(_id,update,{},(err, comment) => {
      if (err) next(err);
      res.json(comment);
    });
  }
};