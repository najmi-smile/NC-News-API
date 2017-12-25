const {Comments} = require('../models/models');
module.exports ={
  getComments (req,res,next) {
    console.log('*** Finding comments in the database ...');
    Comments.find()
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
    res.json(`${req.url} is comming soon .....`);
  },
  removeComment(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
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