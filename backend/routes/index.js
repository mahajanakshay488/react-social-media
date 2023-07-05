var express = require('express');
var router = express.Router();
var userModel = require('./users');
var postModel = require('./posts');
var cmntModel = require('./comments');
var msgModel = require('./messages');
var peakyb = require('./peakyb');

var uuid = require('uuid');
var passport = require('passport');
var localStrategy = require('passport-local');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/profilepics');
  },
  filename: function (req, file, cb) {
    var date = new Date();
    var fileOriginalname = file.originalname.replace(/\s/g, ''); 
    var webpFile = fileOriginalname.split('.')[0]+'.webp'
    var fileName = date.getTime() + webpFile;
    cb(null, fileName);
  }
});
var upload = multer({ storage: storage });

var storageMedia = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/posts');
  },
  filename: function (req, file, cb) {
    var date = new Date();
    var fileOriginalname = file.originalname.replace(/\s/g, ''); 
    var webpFile = fileOriginalname.split('.')[0]+'.webp'
    var fileName = date.getTime() + webpFile;
    cb(null, fileName);
  }
});
var uploadMedia = multer({ storage: storageMedia });


passport.use(new localStrategy(userModel.authenticate()));

router.get('/removal', (req, res)=>{
  userModel.remove({}).then(()=>{
    postModel.remove({}).then(()=>{
      cmntModel.remove({}).then(()=>{
        msgModel.remove({}).then(()=>{
          res.status(200).json({msg: 'Successfully remove schemas!'});
        });
      });
    });
  });
});


// URLS

router.get('/', function(req, res) {
  res.status(200).json({status: 'success', msg: 'Blog Post App'});
});

router.get('/blogers', (req, res) => {
  userModel.find()
  .then((users) => {
    res.status(200).json({status: 'success', msg: 'All Blogers',value: users});
  });
});

router.get('/blogers/:username', (req, res) => {
  userModel.findOne({username: req.params.username})
  .populate('posts')
  .then((user) => {
    res.status(200).json({status: 'success', msg: 'Bloger',value: user});
  });
});

router.get('/allpost', (req, res) => {
  postModel.find().populate('userid')
  .then((posts)=>{
    res.status(200).json({status: 'success', msg: 'All Posts', value: posts.reverse()});
  });
});

router.get('/allpost/:id', (req, res) => {
  postModel.findOne({_id: req.params.id})
  .populate('userid')
  .populate('comments')
  .then((post)=>{
    res.status(200).json({status: 'success', msg: 'Found Post', value: post});
  });
});

router.get('/comments/:postid', (req, res) => {
  cmntModel.find({postid: req.params.postid})
  .populate('userid')
  .populate('postid')
  .then((comments)=>{
    res.status(200).json({status: 'success', msg: 'Comments Of Post', value: comments.reverse()});
  });
});


// URL restricted 

router.get('/profile', isLogedin, (req, res) => {
  userModel.findOne({username: req.session.passport.user}).populate('posts')
  .then((foundUser) => {
    res.status(200).json({status: 'success',msg: 'User Profile',value: foundUser});
  });
});


// posts

// router.post('/post', isLogedin, (req, res) => {
//   userModel.findOne({username: req.session.passport.user})
//   .then((foundUser)=> {
//     postModel.create({
//       title: req.body.title,
//       content: req.body.content,
//       userid: foundUser._id
//     })
//     .then((createdPost)=>{
//       foundUser.posts.push(createdPost);
//       foundUser.save()
//       .then((su)=>{
//         res.status(200).json({status: 'success', msg: 'post created',value: createdPost});
//       });
//     });
//   });
// });

router.post('/post', [uploadMedia.single('imgfile'),isLogedin], (req, res) => {
  userModel.findOne({username: req.session.passport.user})
  .then((foundUser)=> {
    var imgadd = `${req.file.path}`;
    // console.log(req, imgadd);

    postModel.create({
      media: imgadd,
      title: req.body.title,
      content: req.body.content,
      userid: foundUser._id
    })
    .then((createdPost)=>{
      foundUser.posts.push(createdPost);
      foundUser.save()
      .then((su)=>{
        res.status(200).json({status: 'success', msg: 'post created',value: createdPost});
      });
    });
  });
});

router.post('/post/comment/:postid', isLogedin, (req, res)=>{
  userModel.findOne({username: req.session.passport.user})
  .then((foundUser)=> {
    postModel.findOne({_id: req.params.postid})
    .then((foundPost)=>{
      if(!foundPost){
        res.status(200).json({status: 'fail', msg: 'Post Model Error', post: foundPost});
      }
      cmntModel.create({
        comment: req.body.comment,
        postid: foundPost,
        userid: foundUser._id
      })
      .then((newComment)=> {
        foundPost.comments.push(newComment);
        foundPost.save()
        .then((sc)=>{
          res.status(200).json({status: 'success', msg: 'comment added',value: newComment, post: sc})
        });
      });
    });
  });
});

router.get('/post/react/:postid', isLogedin, (req, res)=>{
  userModel.findOne({username: req.session.passport.user})
  .then((foundUser)=>{
    postModel.findOne({_id: req.params.postid})
    .then((foundPost)=>{
      if(foundPost.reacts.includes(foundUser.id)){
        let index = foundPost.reacts.indexOf(foundUser.id);
        foundPost.reacts.splice(index, 1);
      }
      else{
        foundPost.reacts.push(foundUser._id);
      }
      foundPost.save()
        .then((savedPost) => {
          res.status(200).json({status: 'success', msg: 'react save', value: savedPost});
        });
    });
  });
});

// messages

router.get('/chat/chatsec', (req, res) => {
  userModel.findOne({username: req.session.passport.user})
  .then((foundUser)=>{
    var chats = foundUser.msgs;
    res.status(251).json({status: 'success', msg: 'User Chats',value: chats, foundUser}); 
  });
});

router.get('/chat/:chatId', isLogedin, (req, res)=>{
  msgModel.find({chatid: req.params.chatId})
  .then((foundMsgs)=>{
    res.status(200).json({status: 'success', msg: 'User chat by chat id', value: foundMsgs});
  });
});

router.post('/chat/message/:reciever', isLogedin, (req, res)=>{
  console.log(req.params.reciever, req.body.msg);
  userModel.findOne({username: req.session.passport.user})
  .then((foundUser)=>{
    var returnedVal = foundUser.msgs.find(m => m.another === req.params.reciever);
    var chatId = (returnedVal !== undefined) ? returnedVal.chatid : uuid.v4();
    console.log(chatId);
    console.log(returnedVal);
   if(returnedVal === undefined){
      msgModel.create({
        author: foundUser.username,
        reciever: req.params.reciever,
        msg: req.body.msg,
        chatid: chatId
      })
      .then((createdMsg)=>{
        foundUser.msgs.push({chatid: chatId, another: req.params.reciever});
        foundUser.save().then((savedUser)=>{
          userModel.findOne({username: req.params.reciever})
          .then((foundReciever)=>{
            foundReciever.msgs.push({chatid: chatId, another: foundUser.username});
            foundReciever.save().then((savedReciever)=>{
              res.status(200).json({status: 'success', msg: 'message send',value: createdMsg, savedUser, savedReciever});
            });
          });
        });
      }); 
    }
    else{
      msgModel.create({
        author: foundUser.username,
        reciever: req.params.reciever,
        msg: req.body.msg,
        chatid: chatId
      }).then((createdMsg)=>{
        res.status(200).json({msg: 'success', val: createdMsg});
      });
    }
  });
});


// users

router.post('/upload/profilepic', upload.single('imgfile'), function(req, res){
  userModel.findOne({username: req.session.passport.user})
  .then(function(foundUser){
    var imgadd = `${req.file.path}`;
    foundUser.profilepic=imgadd;
    foundUser.save()
    .then(function(){
      res.redirect('/profile');
    });
  });
  // res.send(req.file.path);
});

router.post('/signup', (req, res) => {
  var LucyName = peakyb.PickLucyname;
  var newUser = new userModel({
    name: req.body.name,
    username: req.body.username,
    luckyname: LucyName
  });
  userModel.register(newUser, req.body.password)
  .then((createdUser) =>{
    passport.authenticate('local')(req, res, ()=>{
      res.redirect('/profile');
    });
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login-fail',
}), (req, res) => {});

router.get('/logout', (req, res) => {
  req.logOut();
  res.status(200).json({status: 'success', msg: 'logout successfully.'});
});

router.get('/islogedin', isLogedin, (req, res)=>{
  res.status(200).json({status: 'success',isAuthenticated:true,msg: "login success."});
});


// fail Responce

router.get('/login-fail', (req, res) => {
  res.status(200).json({status: 'fail',notLogedin:true,isAuthenticated:false,msg: "login fail."});
});

function isLogedin(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login-fail');
}

module.exports = router;
