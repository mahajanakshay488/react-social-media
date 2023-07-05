var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  media: '',
  title: String,
  content: String,

  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  
  reacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  
  comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
  }],
});

module.exports = mongoose.model('post', postSchema);