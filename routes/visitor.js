// @DomarysCorrea_2019
// domaryscorrea@gmail.com
// description API_Twitter
// routes of user no logged

const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const passport = require("passport")

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
  if(req.body.password != req.body.password2){
    errors.push({text:"Password not match"})
  }
  if(errors.length > 0){
    res.render("visitor/registerform",{error: errors})
  } else {

    User.findOne({where:{'email':req.body.email}}).then((user) => {
      if(user){
        //req.flash("error_msg","Email used")
        res.redirect('/visitor/register_form')
      } else{
        const new_user = new User ({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })
        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(new_user.password,salt,(err, hash) => {
              if(err) {
                //req.flash("Error in hashing password")
                res.redirect('/register_form')
              }
              new_user.password = hash

            new_user.save().then(() => {
              //req.flash("success_msg",Register done")
              res.redirect('/visitor/log_form')
            })  .catch(() => {
               //req.flash("error_msg","Error in register, please try again")
               res.redirect('/visitor/register_form')
            })
          })
        })
      }
    })
  }
})

// login in system
router.get('/log_form', function (req, res){
  res.render('visitor/logform')
})
router.post('/log_sub', function(req,res,next){
  passport.authenticate("local",{
    successRedirect:"/user/timeline",
    failureRedirect:"/visitor/home",
    failureFlash: true
  })(req,res,next)
})
module.exports = router
