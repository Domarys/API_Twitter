// @DomarysCorrea_2019
// domaryscorrea@gmail.com
// description API_Twitter
// index.js

const express = require("express")
const session = require('express-session')
const flash = require('req-flash')
const app = express()
const path = require("path")
const handlebars = require('express-handlebars')
const body_parser = require('body-parser')
const moment = require('moment')
const Sequelize = require('sequelize')
const User = require('./models/User')
const Post = require('./models/Post')
const Comt = require('./models/Comt')
const user = require("./routes/user")
const visitor = require("./routes/visitor")
const passport = require("passport")
require("./config/auth")(passport)

// Config
  // Session
  app.use(session({
    secret: "liberatsu4599",
    resave: true,
    saveUnitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())


  // Middleware
  app.use((req,res,next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
  })

  //Template Engine
  app.engine('handlebars', handlebars({defaultLayout: 'main' }))
  app.set('view engine','handlebars')
  //body-parser
  app.use(body_parser.urlencoded({extended: false}))
  app.use(body_parser.json())
  // db conection
  const sequelize = new Sequelize('db_test','root','',{
    host:"localhost",
    dialect: 'mysql'
  })

// Public
  app.use(express.static(path.join(__dirname,"public")))

// Routes
  app.use('/user',user)
  app.use('/visitor',visitor)

  app.get('/', (req,res) => {
    res.render('home')
  })

// server on
app.listen(8081, () => {
  console.log("Server on...")
})
