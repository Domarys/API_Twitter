// @DomarysCorrea_2019
// domaryscorrea@gmail.com
// description API_Twitter
// routes of user no logged

const express = require("express")
const router = express.Router()
const User = require('../models/User')

//main
router.get('/', function (req, res){
  res.render('home')
})


//register user
router.get('/register_form', function (req, res){
  res.render('visitor/registerform')
})

router.post('/register_sub', function(req,res){
  User.create({
  username: req.body.username,
  email: req.body.email,
  password: req.body.password
  }).then(function(req,res){
    res.send("Register done")
  }).catch(function(erro){
    res.send("Error " + erro)
  })
  res.redirect('/log_form')
})

// login in system
router.get('/log_form', function (req, res){
  res.render('visitor/logform')
})

router.post('/log_sub', function(req,res){
  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(function(req,res){
    res.send("Login done")
  }).catch(function(erro){
    res.send("Error " + erro)
  })
  res.send("/timeline")
})

module.exports = router
