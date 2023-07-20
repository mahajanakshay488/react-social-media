var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
    author: String,
    reciever: String,
    chatid:String,
    msgs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message'
          }
    ],
});

module.exports = mongoose.model('notification', notificationSchema);