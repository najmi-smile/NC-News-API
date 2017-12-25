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
    res.json(`${req.url} is comming soon .....`);
  },
  voteComment (req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  removeComment(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  updateComment(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  }
};