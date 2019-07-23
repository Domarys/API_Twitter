// @DomarysCorrea_2019
// domaryscorrea@gmail.com
// description API_Twitter
// routes of user logged

const express = require("express")
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')
const Comt = require('../models/Comt')

//main
router.get('/home', function (req, res){
  res.render('home')
})


//timeline view
router.get('/timeline', function (req, res){
  Post.findAll({order:[['idPost','DESC']]}).then(function(posts){
    //res.render('timeline',{nome:"lola", sobrenome: "louca"}) - {{}}
    res.render('user/timeline',{posts: posts})
  })
})


//post form
router.get('/post_form', function (req, res){
  res.render('user/postform')
})

router.post('/post_sub', function(req,res){
  Post.create({
    //idPost: pegar is do post
    //username: pegar nome de quem resoponde
    title: req.body.title,
    text: req.body.text,
    //date:
  }).then(function(req,res){
    res.send("Posting done")
  }).catch(function(erro){
    res.send("Error " + erro)
  })
  res.send('/timeline')
})


//comment form
router.get('/comment_form', function (req, res){
  res.render('user/commentform')
})

router.post('/comment_sub', function(req,res){
  Comt.create({
    //idPost:
    //username:
    text: req.body.text
    //date:
  }).then(function(req,res){
    res.send("Comment done")
  }).catch(function(erro){
    res.send("Error " + erro)
  })
  res.send('/timeline')
})

//delete
//app.get('/delete/:id',function(req,res){
  //Post.destroy({where:{'id': req.params.id}})
//}).then(function()).catch(function(erro){
//  res.send("Error in delete: " + erro)
//})
// Post.destroy()


module.exports = router
