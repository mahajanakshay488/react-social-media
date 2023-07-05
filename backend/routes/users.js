var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

// mongoose.connect('mongodb://localhost/node6major',{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect('mongodb+srv://gentle01:KLiF0g9YcIgGZyPP@cluster0.gehhbs7.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('database connected!'))
.catch(err => console.log(err));

var userSchema = new mongoose.Schema({
  name: String,
  luckyname: String,
  username: String,
  email: String,
  contact: String,
  dob: Date,
  about: String,

  profilepic: {
    type: String,
    default: 'public/images/profilepics/default-avatar.webp'
  },
  
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post'
    }
  ],

  msgs: [
    {
      chatid: String,
      another: String
    }
  ]
});

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);