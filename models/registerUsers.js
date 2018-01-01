const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerUserSchema = new Schema({
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
  },
  password: {
    type: String,
    required : true
  },
  email : {
    type : String,
    required : true
  }
});

module.exports = mongoose.model('registeredusers', registerUserSchema);
