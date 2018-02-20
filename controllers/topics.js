const {Topics,Articles} = require('../models/models');
module.exports ={
  getTopics (req,res,next) {
    return Topics.find()
    .then(topics => {
      res.json(topics);
    })
    .catch(next);
  },
  getTopic(req,res,next) {
    const _id = req.params.topic_id;
    Topics.findById(_id)
    .then(topic => {
      res.json(topic);
    })
    .catch(next);
  },
  getArticlesFromTopic(req,res,next) {
    Articles.find({belongs_to : req.params.slug })
      .then(articles => {
        const obj ={
          articles_found : articles.length,
          list_of_articles : articles
        }
        res.json(obj);
      })
      .catch(next);
  },
  addTopic(req,res,next) {
    const topic = req.body;
    Topics.create(topic, (err,topic) => {
      if(err) next(err);
      res.json(topic);
    });
  },
  removeTopic(req,res,next) {
    Topics.deleteOne({_id:req.params.topic_id}, (err, response) => {
      if(err) next(err);
      res.json(response);
    })
  },
  updateTopic(req,res,next) {
    const _id = req.params.topic_id;
    const topic = req.body;
    const update = {
      title : topic.title,
      slug : topic.slug
    }
    Topics.findOneAndUpdate(_id,update,{},(err, topic) => {
      if (err) next(err);
      res.json(topic);
    });
  }
};