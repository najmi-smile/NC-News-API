var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String,
    required: true,
    lowercase: true
  },
  created_at: {
    type: Number,
    default: new Date().getTime()
  }
});

module.exports = mongoose.model('users', UserSchema);
