var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    lowercase: true,
    required: true
  },
  created_at: {
    type: Number,
    default: new Date().getTime()
  }
});

module.exports = mongoose.model('topics', TopicSchema);
