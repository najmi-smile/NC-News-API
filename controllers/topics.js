const {Topics} = require('../models/models');
module.exports ={
  getTopics (req,res,next) {
    console.log('*** Finding topics in the database ...');
    Topics.find()
    .then(topics => {
      const obj ={
        topics_found : topics.length,
        list_of_topics : topics
      }
      res.json(obj);
    })
    .catch(next);
  },
  getTopic(req,res,next) {
    const _id = req.params.topic_id;
    console.log(`*** Received a find by ID request, ID : ${_id} `);
    Topics.findById(_id)
    .then(topic => {
      res.json(topic);
    })
    .catch(next);
  },
  getArticlesFromTopic(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  addTopic(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  removeTopic(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  updateTopic(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  }
};