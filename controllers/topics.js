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
    console.log(`*** Looking for topic, ID : ${_id} `);
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
    console.log(`*** Wait! Adding topic ... `);
    const topic = req.body;
    Topics.create(topic, (err,topic) => {
      if(err) next(err);
      res.json(topic);
    });
  },
  removeTopic(req,res,next) {
    res.json(`${req.url} is comming soon .....`);
  },
  updateTopic(req,res,next) {
    const _id = req.params.topic_id;
    const topic = req.body;
    const update = {
      title : topic.title,
      slug : topic.slug
    }
    console.log(`*** Received a request from ${topic.title} ID ${_id} ...`)
    Topics.findOneAndUpdate(_id,update,{},(err, topic) => {
      if (err) next(err);
      res.json(topic);
    });
  }
};