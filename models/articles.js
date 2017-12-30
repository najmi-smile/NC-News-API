var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    requied: true
  },
  belongs_to: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true,
    default: 0
  },
  created_by: {
    type: String,
    lowercase: true
  }, 
  created_at: {
    type: Number,
    default: new Date().getTime()
  },
  img_url: {
    type: String,
    lowercase: true
  }
});

module.exports = mongoose.model('articles', ArticleSchema);
