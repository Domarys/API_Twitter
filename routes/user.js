// @DomarysCorrea_2019
// domaryscorrea@gmail.com
// description API_Twitter
// routes of user logged

const express = require("express")
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')
const Comt = require('../models/Comt')
const {logged} = require("../helpers/logged")

// LOGOUT
router.get("/logout",(req,res) => {
  req.logout()
  req.flash("success_msg","Deslogged with sucess")
  res.redirect("/visitor/home")
})

// PERFIL ROUTES
// my_account
router.get('/my_account', logged, (req, res) => {
  User.findOne({where:{'username':"afawfqwf"}}).then((user) => {
    res.render('user/myaccount',{'user': user})
  }).catch(() => {
    //  req.flash("error_msg","There was a error, please try again.")
    res.redirect('/user/timeline')
  })
})

// account_edit
router.get('/account_edit/:username', logged, (req,res) => {
  User.findOne({where:{'username':"afawfqwf"}}).then((user) => {
    res.render('user/accountedit',{'user': user})
  }).catch(() => {
    //  req.flash("error_msg","There was a error, please try again.")
    res.redirect('/user/timeline')
  })
})
router.post('/account_edit_sub', (req,res) => {
  var errs = []
  if(!req.body.email || req.body.email == undefined || req.body.email == null){
    errs.push({text:"Invalid email"})
  }
  if(!req.body.password || req.body.password == undefined || req.body.password == null){
    errs.push({text:"Invalid password"})
  }
  if(errs.length > 0){
    res.render("user/accountedit",{error: errs})
  } else {
    User.findOne({where:{'username':req.body.username}
    }).then((userx) => {
      //idPost: pegar is do post
      //username: pegar nome de quem resoponde
      user.email = req.body.email,
      user.password =  req.body.password,
      //date:    }).catch(() => {
      //  req.flash("error_msg","There was a error, please try again.")
      user.save().then(() => {
        res.redirect('/user/my_account')
      }).catch((err) => {
        //req.flash("error_msg","There was a error, please try again.")
        res.send("Error " + err)
      })

    }).catch((err) => {
      //
      req.flash("error_msg","There was a error, please try again.")
      res.send("Error " + err)
    })
  }
})
// account_delete
router.get('/account_delete/:username',logged, (req,res) => {
  User.destroy({where: {'username':req.params.username}})
  .then(() => {
    //req.flash("success_msg","Done with sucess!"
    res.redirect('/visitor/home')
  }).catch((err) => {
    //  req.flash("error_msg","There was a error, please try again.")
    res.send("Error in delete: " + err)
  })
})


// POST ROUTES
// post view
router.get('/timeline', logged, function (req, res){
  Post.findAll({order:[['idPost','DESC']]}).then(function(posts){
    res.render('user/timeline',{posts: posts})
  })
})

//post inclusion
router.get('/post_form', logged, function (req, res){
  res.render('user/postform')
})
router.post('/post_sub', function(req,res){
  var errors = []
  if(!req.body.title || req.body.title == undefined || req.body.title == null){
    errors.push({text:"Invalid title"})
  }
  if(!req.body.text || req.body.text == undefined || req.body.text == null){
    errors.push({text:"Invalid text"})
  }
  if(errors.length > 0){
    res.render("visitor/registerform",{error: errors})
  } else {
    Post.create({
      //idPost: pegar is do post
      //username: pegar nome de quem resoponde
      title: req.body.title,
      text: req.body.text,
      //date:
    }).then(() => {
      //req.flash("success_msg","Done with sucess!")
      res.redirect('/user/timeline')
    }).catch((err) => {
      //req.flash("error_msg","There was a error, please try again.")
      res.send("Error " + err)
    })
  }
})

// post edition
router.get('/post_edit/:idPost', logged, (req,res) => {
  Post.findOne({where:{'idPost':req.params.idPost}}).then((post) => {
    res.render('user/editform',{'post': post})
  }).catch(() => {
    //  req.flash("error_msg","There was a error, please try again.")
    res.redirect('/user/timeline')
  })
})
router.post('/post_edit_sub', logged, (req,res) => {
  var errors = []
  if(!req.body.title || req.body.title == undefined || req.body.title == null){
    errors.push({text:"Invalid title"})
  }
  if(!req.body.text || req.body.text == undefined || req.body.text == null){
    errors.push({text:"Invalid text"})
  }
  if(errors.length > 0){
    res.render("visitor/registerform",{error: errors})
  } else {

    Post.findOne({where:{'idPost':req.body.idPost}
    }).then((post) => {
      //idPost: pegar is do post
      //username: pegar nome de quem resoponde
      post.title = req.body.title,
      post.text =  req.body.text,
      //date:    }).catch(() => {
      //  req.flash("error_msg","There was a error, please try again.")
      post.save().then(() => {
        res.redirect('/user/timeline')
      }).catch(() => {
        //req.flash("error_msg","There was a error, please try again.")
        res.send("Error " + erro)
      })

    }).catch(() => {
      //
      req.flash("error_msg","There was a error, please try again.")
      res.send("Error " + erro)
    })
  }
})

//post delete
router.get('/delete_post/:idPost', logged, (req,res) => {
  Post.destroy({where: {'idPost':req.params.idPost}})
  .then(() => {
    //req.flash("success_msg","Done with sucess!"
    res.redirect('/user/timeline')
  }).catch((err) => {
    //  req.flash("error_msg","There was a error, please try again.")
    res.send("Error in delete: " + err)
  })
})


// COMMENT ROUTES
//comments view
router.get('/comments', (req, res) => {
  Comt.findAll({order:[['idComt','DESC']]}).then(function(comts){
    res.render('user/comments',{comts: comts})
  })})

//comment inclusion
router.get('/comment_form', function (req, res){
  res.render('user/commentform')
})
router.post('/comment_sub', function(req,res){
  var errors = []
  if(!req.body.text || req.body.text == undefined || req.body.text == null){
    errors.push({text:"Invalid text"})
  }
  if(errors.length > 0){
    res.render("visitor/registerform",{error: errors})
  } else {
    Comt.create({
      //idPost:
      //username:
      text: req.body.text
      //date:
    }).then(() => {
    //  req.flash("success_msg","Done with sucess!")
      res.redirect('/user/timeline')
    }).catch(function(erro){
    //  req.flash("error_msg","There was a error, please try again.")
      res.send("Error " + erro)
    })
  }
})

// comment edition
router.get('/comt_edit/:idComt', (req,res) => {
  Comt.findOne({where:{'idComt':req.params.idComt}}).then((comt) => {
    res.render('user/editcomt',{'comt': comt})
  }).catch(() => {
    //  req.flash("error_msg","There was a error, please try again.")
    res.redirect('/user/timeline')
  })
})
router.post('/comt_edit_sub', (req,res) => {
  var errors = []
  if(!req.body.text || req.body.text == undefined || req.body.text == null){
    errors.push({text:"Invalid text"})
  }
  if(errors.length > 0){
    // verificar
    res.render("visitor/registerform",{error: errors})
  } else {
    Comt.findOne({where:{'idComt':req.body.idComt}
  }).then((comt) => {
      //idPost: pegar is do post
      //username: pegar nome de quem resoponde
      comt.text =  req.body.text,
      //date:    }).catch(() => {
      //  req.flash("error_msg","There was a error, please try again.")
      comt.save().then(() => {
        res.redirect('/user/timeline')
      }).catch(() => {
        //req.flash("error_msg","There was a error, please try again.")
        res.send("Error " + erro)
      })
    }).catch(() => {
      //req.flash("error_msg","There was a error, please try again.")
      res.send("Error " + erro)
    })
  }
})

// comment delete
router.get('/delete_comment/:idComt',(req,res) => {
  Comt.destroy({where: {'idComt':req.params.idComt}})
  .then(() => {
    //req.flash("success_msg","Done with sucess!"
    res.redirect('/user/timeline')
  }).catch((err) => {
    //  req.flash("error_msg","There was a error, please try again.")
    res.send("Error in delete: " + err)
  })
})

module.exports = router
