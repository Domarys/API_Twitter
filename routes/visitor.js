// @DomarysCorrea_2019
// domaryscorrea@gmail.com
// description API_Twitter
// routes of user no logged

const express = require("express")
const router = express.Router()
const User = require('../models/User')

//main
router.get('/home', function (req, res){
  res.render('visitor/home')
})

//acess restrict
router.get('/access_restrict', function (req, res){
  res.render('visitor/access_restrict')
})

//register user
router.get('/register_form', function (req, res){
  res.render('visitor/registerform')
})
router.post('/register_sub', function(req,res){
  var errors = []
  if(!req.body.username || req.body.username == undefined || req.body.username == null){
    errors.push({text:"Invalid username"})
  }
  if(!req.body.email || req.body.email == undefined || req.body.email == null){
    errors.push({text:"Invalid email"})
  }
  if(!req.body.password || req.body.password == undefined || req.body.password == null){
    errors.push({text:"Invalid password"})
  }
  if(errors.length > 0){
    res.render("visitor/registerform",{error: errors})
  } else {
    User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
    }).then(function(req,res){
      req.flash("success_msg","Register done, do login")
      res.redirect('log_form')
    }).catch(function(err){
    //  req.flash("error_msg","Error, please try again")
      res.send("Error " + err)
    })
  }
})

// login in system
router.get('/log_form', function (req, res){
  res.render('visitor/logform')
})
router.post('/log_sub', function(req,res){
  var errors = []
  if(!req.body.email || req.body.email == undefined || req.body.email == null){
    errors.push({text:"Invalid email"})
  }
  if(!req.body.password || req.body.password == undefined || req.body.password == null){
    errors.push({text:"Invalid password"})
  }
  if(errors.length > 0){
    res.render("visitor/log_form",{error: errors})
  } else {
    User.create({
      username: req.body.email,
      password: req.body.password
    }).then(function(req,res){
      res.send("/timeline")
    }).catch(function(err){
      res.send("Error " + err)
    })
  }
})

module.exports = router
